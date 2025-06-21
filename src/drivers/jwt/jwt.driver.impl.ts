import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtDriver } from './jwt.driver';

@Injectable()
export class JwtDriver implements IJwtDriver {
  constructor(private readonly jwtService: JwtService) {}
  sign(payload: Parameters<JwtService['sign']>[0]): string {
    return this.jwtService.sign(payload);
  }
  verify<T extends object>(token: string): T {
    return this.jwtService.verify(token);
  }
}
