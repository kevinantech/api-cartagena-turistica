import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { ResourceController } from './resource.controller';
import { ResourceSchema } from './resource.schema';
import { ResourceService } from './resource.service';

@Module({
  controllers: [ResourceController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Collection.Resource,
        schema: ResourceSchema,
      },
    ]),
  ],
  providers: [ResourceService],
})
export class ResourceModule {}
