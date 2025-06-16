import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Account } from './account.schema';
import { AuthenticateAccountDto } from './dto/authenticate-account.dto';
import { RegisterAccountDto } from './dto/register-account.dto';
import { Collection } from 'src/common/enums/collection.enum';
const saltOrRounds = 10;

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Collection.Account)
    private accountModel: Model<Account>,
    private jwtService: JwtService,
  ) {}

  async authenticate(
    authenticateAccountDto: AuthenticateAccountDto,
  ): Promise<{ access_token: string }> {
    const account = await this.accountModel
      .findOne({ email: authenticateAccountDto.email })
      .exec();
    if (!account) throw new UnauthorizedException();

    const isPasswordValid = await bcrypt.compare(
      authenticateAccountDto.password,
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

  async register(
    registerAccountDto: RegisterAccountDto,
  ): Promise<{ id: string }> {
    const existingAccount = await this.accountModel
      .findOne({ email: registerAccountDto.email })
      .exec();
    if (existingAccount) throw new UnauthorizedException();

    const password_hash = await bcrypt.hash(
      registerAccountDto.password,
      saltOrRounds,
    );

    const newAccount = await this.accountModel.create({
      ...registerAccountDto,
      password_hash,
    } as Account);

    return { id: newAccount._id.toString() };
  }
}
