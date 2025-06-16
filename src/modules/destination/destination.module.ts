import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection } from 'src/common/enums/collection.enum';
import { DestinationController } from './destination.controller';
import { DestinationSchema } from './destination.schema';
import { DestinationService } from './destination.service';

@Module({
  controllers: [DestinationController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Collection.Destination,
        schema: DestinationSchema,
      },
    ]),
  ],
  providers: [DestinationService],
})
export class DestinationModule {}
