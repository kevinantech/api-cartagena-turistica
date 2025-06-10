import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AdminAccount } from './admin-account.schema';
const saltOrRounds = 10;

export type RegisterAdminAccountReturn = {
  id: string;
};

export type AuthenticateReturn = {
  access_token: string;
};

@Injectable()
export class AdminAccountService {
  constructor(
    @InjectModel(AdminAccount.name)
    private adminAccountModel: Model<AdminAccount>,
    private jwtService: JwtService,
  ) {}

  async register(
    adminAccountBody: AdminAccount,
    verificationCode: string,
  ): Promise<RegisterAdminAccountReturn> {
    const VERIFICATION_CODE = '40306c7fd68b722bd7bbfb4fd7c0ce31';
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

  async authenticate(
    email: string,
    password: string,
  ): Promise<AuthenticateReturn> {
    const adminAccount = await this.adminAccountModel.findOne({ email }).exec();
    if (!adminAccount) throw new UnauthorizedException();

    const isPasswordValid = await bcrypt.compare(
      password,
      adminAccount.password,
    );

    if (!isPasswordValid) throw new UnauthorizedException();

    const payload = {
      id: adminAccount._id,
      email: adminAccount.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
