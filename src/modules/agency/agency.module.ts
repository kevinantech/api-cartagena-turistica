import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtConfig } from 'src/config/jwt.config';
import { AgencyController } from './agency.controller';
import { Agency, AgencySchema } from './agency.schema';
import { AgencyService } from './agency.service';

@Module({
  controllers: [AgencyController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Agency.name,
        schema: AgencySchema,
      },
    ]),
    JwtModule.registerAsync(JwtConfig({})),
  ],
  providers: [AgencyService],
})
export class AgencyModule {}
