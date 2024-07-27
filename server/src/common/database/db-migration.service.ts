import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {config, database, up} from 'migrate-mongo';

@Injectable()
//on moduleInit is a lifecycle hook that is called once thr host module has been initialized.
export class DbMigrationService implements OnModuleInit{
    readonly name :string;
    private readonly dbMigrationsConfig : Partial<config.Config> = {
        //DB connection details for the migration tool
        mongodb:{
            databaseName:this.configService.getOrThrow<string>('MONGO_DB_NAME'),
            url:this.configService.getOrThrow<string>('MONGODB_URI')
        },
        // Location of the migration Files
        migrationsDir:`${__dirname}../../migrations`,
        // collection thet migration mongo will use to keep track of the migration
        changelogCollectionName:'changelog',
        migrationFileExtension:'.js',
    }
    constructor(
        private readonly configService : ConfigService
    ){}

    async onModuleInit(){
        
        config.set(this.dbMigrationsConfig);
        const {db,client} = await database.connect();
        await up (db,client)  
      }
}