import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractEntity } from "src/common/database/abstract.entity";

//VersionKey:false is used to diable the version key in the schema.
@Schema({
    versionKey: false
})
@ObjectType()
export class User extends AbstractEntity {

    //Prop decorator is used to define a field as a mongoose schema property.
    @Prop()
    @Field()
    email: string;

    @Prop()
    // Don't use @Field()decorator fro password to prevent it from being exposed in the GraphQL schema
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User)