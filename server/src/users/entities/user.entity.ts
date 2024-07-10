import { ObjectType, Field, Int } from '@nestjs/graphql';


// ObjectType Deorator is user to define a class as a GraphQL object type.
@ObjectType()
export class User {
  // Field decorator is used to define a field as a GeaphQL field.
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
