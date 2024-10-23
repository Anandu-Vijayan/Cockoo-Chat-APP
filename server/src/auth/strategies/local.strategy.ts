import { Injectable, UnauthorizedException } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import { UsersService } from "src/users/users.service";

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly usersService:UsersService){

        // default usernameField is 'username',but we want to use 'email'
        super({usernameField:'email'});
    }

    async validate(email:string,password:string){
        try{
            return await this.usersService.verifyUser(email,password);
        }catch(error){
            // rethrow the error as UnauthorizedException
            throw new UnauthorizedException(error)
        }
    }
}
