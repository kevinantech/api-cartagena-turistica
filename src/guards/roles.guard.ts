import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokenPayload } from 'src/common/interfaces/auth.interface';
import { Role, ROLES_KEY } from 'src/decorators/role/roles.decorator';
import { IJwtDriver } from 'src/drivers/jwt/jwt.driver';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtDriver: IJwtDriver,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;
    const request: Request = context.switchToHttp().getRequest();

    const access_token = this.extractTokenFromHeader(request);
    if (!access_token) return false;
    const user = this.jwtDriver.verify<AccessTokenPayload>(access_token);
    return requiredRoles.some((role) => user?.role?.includes(role));
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Extraer token del header Authorization: Bearer <token>
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
