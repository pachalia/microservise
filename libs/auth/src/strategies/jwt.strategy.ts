import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@lib/auth';
import { ICurrentUser } from '@lib/auth/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'fwciviffdpapOOCJVUVVJ',
    });
  }

  async validate(payload: ICurrentUser): Promise<ICurrentUser> {
    const user = await this.authService.validateUser(payload.userName);
    if (!user) {
      throw new UnauthorizedException(
        `Пользователя  ${payload.userName} не существует`,
      );
    }
    return payload;
  }
}
