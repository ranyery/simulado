import { IUser } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly _jwtService: JwtService) {}

  public create(user: IUser): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      permissions: user.permissions,
    };

    return this._jwtService.signAsync(payload);
  }
}