import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema:Joi.object({
        MONGODB_URI:Joi.string().required(),
        // PORT: Joi.number().default(4000),
        // NODE_ENV:Joi.string().valid('development','production','test').
        // default('development')
      })
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
