import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class RegisterAgencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  rnt: string;

  @IsNotEmpty()
  @IsNumberString()
  nit: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;
}
