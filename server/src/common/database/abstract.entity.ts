import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes,Types } from "mongoose";

//Schema decorator is used to define a class as a Mongoose Schema
@Schema()
// AbstractDocument class is used to define a base class for all Mongoose
@ObjectType({isAbstract:true})
export class AbstractEntity {
    @Prop({ type: SchemaTypes.ObjectId })
    @Field(()=>ID)
//Prop decorator is used to define a property as aMongoose Schema Property
    _id: Types.ObjectId;
}