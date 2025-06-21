import { Role } from 'src/decorators/role/roles.decorator';

export interface AccessTokenPayload {
  id: string;
  role: Role;
  name: string;
  email: string;
}
