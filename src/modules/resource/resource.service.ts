import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { Resource } from './resource.schema';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(Collection.Resource) private resourceModel: Model<Resource>,
  ) {}

  async create() {}
}
