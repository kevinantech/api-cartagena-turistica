import { Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Destination } from './destination.schema';
import { Model } from 'mongoose';

@Injectable()
export class DestinationService {
  constructor(
    @InjectModel(Destination.name) private destinationModel: Model<Destination>,
  ) {}

  async create(createDestinationDto: CreateDestinationDto) {
    return await this.destinationModel.create(createDestinationDto);
  }

  async findAll() {
    return await this.destinationModel.find();
  }

  async findOne(id: string) {
    return await this.destinationModel.findById(id);
  }

  async update(id: string, updateDestinationDto: UpdateDestinationDto) {
    return await this.destinationModel.findByIdAndUpdate(
      id,
      updateDestinationDto,
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.destinationModel.findByIdAndDelete(id);
  }
}
