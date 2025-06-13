import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency } from './agency.schema';

export type RegisterAgencyReturn = Awaited<
  ReturnType<AgencyService['register']>
>;

@Injectable()
export class AgencyService {
  constructor(
    @InjectModel(Agency.name)
    private agencyModel: Model<Agency>,
  ) {}

  async register(agencyBody: Agency) {
    const existingAccount = await this.agencyModel
      .findOne({
        $or: [{ nit: agencyBody.nit }, { rnt: agencyBody.rnt }],
      })
      .exec();

    if (existingAccount) {
      throw new ConflictException(
        'Ya existe una agencia registrada con los registros legales indicados',
      );
    }

    const newAccount = await this.agencyModel.create(agencyBody);

    return {
      id: newAccount._id.toString(),
    };
  }
}
