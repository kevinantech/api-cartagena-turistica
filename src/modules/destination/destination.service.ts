import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { Destination } from './destination.schema';
import { CreateDestinationDto } from './dto/create-destination.dto';

@Injectable()
export class DestinationService {
  constructor(
    @InjectModel(Collection.Destination)
    private destinationModel: Model<Destination>,
  ) {}

  async create(createDestinationDto: CreateDestinationDto) {
    return await this.destinationModel.create(createDestinationDto);
  }
}
