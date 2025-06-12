import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { ProviderAccount } from './provider-account.schema';
import {
  AuthenticationResult,
  Credentials,
} from 'src/common/entities/auth.entity';

export type RegisterProviderAccountReturn = Awaited<
  ReturnType<ProviderAccountService['register']>
>;

@Injectable()
export class ProviderAccountService {
  constructor(
    @InjectModel(ProviderAccount.name)
    private providerAccountModel: Model<ProviderAccount>,
    private jwtService: JwtService,
  ) {}

  async authenticate({
    email,
    password,
  }: Credentials): Promise<AuthenticationResult> {
    const account = await this.providerAccountModel.findOne({ email }).exec();
    if (!account) throw new UnauthorizedException();

    const isPasswordValid = await bcrypt.compare(password, account.password);

    if (!isPasswordValid) throw new UnauthorizedException();

    const payload = {
      id: account._id,
      email: account.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(providerAccountBody: ProviderAccount) {
    const existingAccount = await this.providerAccountModel
      .findOne({
        $or: [
          { nit: providerAccountBody.nit },
          { rnt: providerAccountBody.rnt },
        ],
      })
      .exec();

    if (existingAccount) {
      throw new ConflictException(
        'Ya existe una cuenta registrada con los registros legales indicados',
      );
    }

    const saltOrRounds = 10;
    const encryptedPassword = await bcrypt.hash(
      providerAccountBody.password,
      saltOrRounds,
    );

    const newAccount = await this.providerAccountModel.create({
      ...providerAccountBody,
      password: encryptedPassword,
    });

    return {
      id: newAccount._id.toString(),
    };
  }
}
