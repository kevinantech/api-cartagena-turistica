import { JwtService } from '@nestjs/jwt';

export abstract class IJwtDriver {
  abstract sign<T extends Parameters<JwtService['sign']>[0]>(
    payload: T,
  ): string;
  abstract verify<T extends object>(token: string): T;
}
