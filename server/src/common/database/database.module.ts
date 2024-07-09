import { Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";



@Module({
    imports: [MongooseModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
            connectionFactory:(connection)=>{
                Logger.log('Database Connected','MongooseModule');
                return connection
            }
        }),
        inject: [ConfigService],
    })],
    controllers: [],
    providers: [],
})

export class DatabaseModule { }  