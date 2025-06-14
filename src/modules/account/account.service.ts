import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import {
  AuthenticationResult,
  Credentials,
} from 'src/common/entities/auth.entity';
import { Account } from './account.schema';
import { RegisterAccountDto } from './dto/register-account.dto';
const saltOrRounds = 10;

export type RegisterAccountReturn = Awaited<
  ReturnType<AccountService['register']>
>;

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<Account>,
    private jwtService: JwtService,
  ) {}

  async authenticate({
    email,
    password,
  }: Credentials): Promise<AuthenticationResult> {
    const account = await this.accountModel.findOne({ email }).exec();
    if (!account) throw new UnauthorizedException();

    const isPasswordValid = await bcrypt.compare(
      password,
      account.password_hash,
    );

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

  async register(accountBody: RegisterAccountDto) {
    const existingAccount = await this.accountModel
      .findOne({ email: accountBody.email })
      .exec();
    if (existingAccount) throw new UnauthorizedException();

    const password_hash = await bcrypt.hash(accountBody.password, saltOrRounds);

    const newAccount = await this.accountModel.create({
      ...accountBody,
      password_hash,
    } as Account);

    return { id: newAccount._id.toString() };
  }
}
