import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export interface AuthenticationResult {
  access_token: string;
}

export class Credentials {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
