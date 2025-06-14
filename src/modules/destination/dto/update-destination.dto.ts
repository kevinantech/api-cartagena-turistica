import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinationDto } from './create-destination.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDestinationDto extends PartialType(CreateDestinationDto) {
  @IsString()
  @IsOptional()
  name?: string | undefined;
}
