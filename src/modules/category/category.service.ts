import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { Collection } from 'src/common/enums/collection.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Collection.Category)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.create(createCategoryDto);
  }
}
