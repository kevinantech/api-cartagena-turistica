import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtDriver } from './jwt/jwt.driver.impl';
import { IJwtDriver } from './jwt/jwt.driver';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: IJwtDriver,
      useClass: JwtDriver,
    },
  ],
  exports: [IJwtDriver],
})
export class DriversModule {}
