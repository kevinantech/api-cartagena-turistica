import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { CategorySchema } from './category.schema';

@Module({
  controllers: [CategoryController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Collection.Category,
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [CategoryService],
})
export class CategoryModule {}
