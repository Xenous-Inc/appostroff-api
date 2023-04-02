import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        try {
            const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
            if (isPublic) {
                return true;
            }

            const user = request.user;
            const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

            if (!user || !user.roles || !requiredRoles) {
                return false;
            }

            return requiredRoles.every(role => user.roles.includes(role));
        } catch (e) {
            throw new HttpException('Have not a access', HttpStatus.FORBIDDEN);
        }
        //     const req = context.switchToHttp().getRequest();
        //     try {
        //         const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        //             context.getHandler(),
        //             context.getClass(),
        //         ]);
        //         if (requiredRoles!) {
        //             return true;
        //        }
        //         const authHeader = req.headers.authorization;
        //         const token = authHeader.split(' ')[1];
        //         const user = this.jwtService.verify(token);
        //         req.user = user;
        //         return user.roles.some(role => requiredRoles.includes(role.value));
        //     } catch (e) {
        //         throw new HttpException('Have not a access', HttpStatus.FORBIDDEN);
        //     }
        // }
    }
}
