import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '@simulado/domain';

@Injectable()
export class TokenService {
  constructor(private readonly _jwtService: JwtService) {}

  public create(user: IUser): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    return this._jwtService.signAsync(payload);
  }
}
