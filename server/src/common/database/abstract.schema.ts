import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

//Schema decorator is used to define a class as a Mongoose Schema
@Schema()
// AbstractDocument class is used to define a base class for all Mongoose
export class AbstractDocument {
    @Prop({ type: SchemaTypes.ObjectId })
//Prop decorator is used to define a property as aMongoose Schema Property
    _id: Types.ObjectId;
}