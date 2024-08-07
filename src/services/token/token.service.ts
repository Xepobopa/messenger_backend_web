import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    public generateToken(payload: any) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
            algorithm: 'HS256',
            jwtid: v4(),
        });
    }

    /**
     * Verify and return payload if token is valid
     * @param token  -  Token that will be verified
     * @param type   -  Access ot Refresh token
     */
    public verifyToken(token: string, type: 'access' | 'refresh') {
        try {
            return this.jwtService.verify(token, {
                secret: this.configService.get<string>('SECRET'),
                ignoreExpiration: false,
                algorithms: ['HS256'],
            });
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    public generateTokenEmail(payload: object) {
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
            algorithm: 'HS256',
        });
    }
}
