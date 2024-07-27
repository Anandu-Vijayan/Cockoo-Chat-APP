import { Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { DbMigrationService } from "./db-migration.service";



@Module({
    imports: [MongooseModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
            connectionFactory: (connection) => {
                Logger.log('Database Connected', 'MongooseModule');
                return connection
            }
        }),
        inject: [ConfigService],
    })],
    controllers: [],
    providers: [DbMigrationService],
})

export class DatabaseModule {
    static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models)

       

    }
}  