import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import {
  AuthenticationResult,
  Credentials,
} from 'src/common/entities/auth.entity';
import { AdminAccount } from './admin-account.schema';
const saltOrRounds = 10;

export type RegisterAdminAccountReturn = Awaited<
  ReturnType<AdminAccountService['register']>
>;

@Injectable()
export class AdminAccountService {
  constructor(
    @InjectModel(AdminAccount.name)
    private adminAccountModel: Model<AdminAccount>,
    private jwtService: JwtService,
  ) {}

  async authenticate({
    email,
    password,
  }: Credentials): Promise<AuthenticationResult> {
    const account = await this.adminAccountModel.findOne({ email }).exec();
    if (!account) throw new UnauthorizedException();

    const isPasswordValid = await bcrypt.compare(password, account.password);

    if (!isPasswordValid) throw new UnauthorizedException();

    const payload = {
      id: account._id,
      name: account.name,
      email: account.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // NOTE: Código de verificación quemado.
  async register(adminAccountBody: AdminAccount, verificationCode: string) {
    const VERIFICATION_CODE = process.env.ADMIN_REGISTER_VERIFICATION_CODE;
    if (verificationCode !== VERIFICATION_CODE)
      throw new UnauthorizedException();

    const existingAdminAccount = await this.adminAccountModel
      .findOne({ email: adminAccountBody.email })
      .exec();
    if (existingAdminAccount) throw new UnauthorizedException();

    const encryptedPassword = await bcrypt.hash(
      adminAccountBody.password,
      saltOrRounds,
    );

    const adminAccount = await this.adminAccountModel.create({
      ...adminAccountBody,
      password: encryptedPassword,
    });

    return { id: adminAccount._id.toString() };
  }
}
