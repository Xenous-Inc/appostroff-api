import { ForbiddenException, Injectable } from '@nestjs/common';
import { Tokens } from './types';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { hashSync, genSalt, compareSync } from 'bcryptjs';
import { User } from '../users/users.model';
import { JwtPayload } from './types';
import { configuration } from '../../config/configuration';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private userModel: typeof User, private jwtService: JwtService) {}
    async signUp(dto: CreateUserDto): Promise<Tokens> {
        const currentUser = await this.userModel.create({
            name: dto.name,
            phone: dto.phone,
        });
        const tokens = await this.getTokens(currentUser.id, currentUser.phone);
        await this.updateRtHash(currentUser.id, tokens.refresh_token);
        return tokens;
    }
    async signIn(dto: CreateUserDto): Promise<Tokens> {
        const currentUser = await this.userModel.findOne({ where: { phone: dto.phone, name: dto.name } });
        if (!currentUser) throw new ForbiddenException('Access Denied');
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
        if (!currentUser || !currentUser.hashedRt) throw new ForbiddenException('Access Denied');
        const rtMatch = await compareSync(rt, currentUser.hashedRt);
        if (!rtMatch) throw new ForbiddenException('Access Denied');

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
