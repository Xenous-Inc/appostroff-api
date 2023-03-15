import { ForbiddenException, Injectable } from '@nestjs/common';
import { Tokens } from './types';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { hashSync, genSalt, compareSync } from 'bcryptjs';
import { User } from '../users/users.model';
import { JwtPayload } from './types';
import { configuration } from '../../config/configuration';
import { ConfirmCodeDto } from './dto/confirmCode.dto';
import { Auth } from './auth.model';
import { RequestCodeDto } from './dto/requestCode.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private jwtService: JwtService,
        @InjectModel(Auth) private authModule: typeof Auth,
    ) {}

    async requestCode(dto: RequestCodeDto) {
        const url = `https://api.ucaller.ru/v1.0/initCall?service_id=${configuration().ucaller_id}&key=${
            configuration().ucaller_token
        }&phone=${dto.phone.slice(1)}`;
        console.log(url);
        const response: any = await fetch(url, {
            headers: {
                Authorization: `Bearear ${configuration().ucaller_token}`,
            },
        });
        const result = await response.json();
        if (response.status != 200) {
            throw new ForbiddenException('Access denied');
        }
        await this.authModule.create({
            phone: dto.phone,
            code: parseInt(result.code),
            isConfirmed: false,
            callId: result.ucaller_id,
        });
        return true;
    }

    async confirmationCode(dto: ConfirmCodeDto): Promise<Tokens> {
        const currentConfirmation = await this.authModule.findOne({ where: { phone: dto.phone } });

        if (dto.code != currentConfirmation.code) {
            throw new ForbiddenException('Access denied');
        }
        let currentUser = await this.userModel.findOne({ where: { phone: dto.phone } });
        if (!currentUser) {
            currentUser = await this.userModel.create({
                phone: dto.phone,
            });
        }
        await this.authModule.update({ isConfirmed: true }, { where: { phone: dto.phone } });
        const tokens = await this.getTokens(currentUser.id, currentUser.phone);
        await this.updateRtHash(currentUser.id, tokens.refresh_token);
        return tokens;
    }

    async logout(id: string): Promise<boolean> {
        await this.userModel.update({ hashedRt: null }, { where: { id: id } });
        return true;
    }

    async refreshTokens(id: string, rt: string): Promise<Tokens> {
        const currentUser = await this.userModel.findOne({ where: { id: id } });
        if (!currentUser || !currentUser.hashedRt) throw new ForbiddenException('Access denied');
        const rtMatch = await compareSync(rt, currentUser.hashedRt);
        if (!rtMatch) throw new ForbiddenException('Access denied');

        const tokens = await this.getTokens(currentUser.id, currentUser.phone);
        await this.updateRtHash(currentUser.id, tokens.refresh_token);

        return tokens;
    }
    async getTokens(id: string, phone: string) {
        const jwtPayload: JwtPayload = {
            id: id,
            phone: phone,
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: configuration().at_secret,
                expiresIn: configuration().at_expiration,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: configuration().rt_secret,
                expiresIn: configuration().rt_expiration,
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async updateRtHash(id: string, rt: string): Promise<void> {
        const salt = await genSalt(configuration().salt);
        const hash = await hashSync(rt, salt);
        await this.userModel.update({ hashedRt: hash }, { where: { id: id } });
    }
}
