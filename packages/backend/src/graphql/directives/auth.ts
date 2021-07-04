/* eslint-disable no-underscore-dangle */
import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server';
import {
  GraphQLField,
  GraphQLInterfaceType,
  GraphQLObjectType,
  defaultFieldResolver,
} from 'graphql';

import { User } from '../../entity/User';

type Context = {
  user: User;
};

class AuthDirective extends SchemaDirectiveVisitor {
  private errorMessage = 'You need to be authenticated';

  public visitObject(object: GraphQLObjectType | GraphQLInterfaceType): void {
    Object.values(object.getFields()).forEach((field) => {
      this.visitFieldDefinition(field);
    });
  }

  public visitFieldDefinition(field: GraphQLField<unknown, Context>): void {
    const { resolve = defaultFieldResolver } = field;
    const { errorMessage } = this;

    // eslint-disable-next-line no-param-reassign
    field.resolve = function resolveField(...args): Promise<unknown> {
      const { user } = args[2];
      if (!user) {
        throw new AuthenticationError(errorMessage);
      }

      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
