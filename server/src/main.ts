import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{bufferLogs:true});
  app.useLogger(app.get(Logger));
  app.enableCors({
    origin:'*',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue:false,
    optionsSuccessStatus:204,
  });
  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
 
