import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterAdminAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 256)
  password: string;

  @IsNotEmpty()
  @IsString()
  verificationCode: string;
}
