import {SchemaDirectiveVisitor, AuthenticationError} from "apollo-server";
import {GraphQLField, GraphQLInterfaceType, GraphQLObjectType, defaultFieldResolver} from "graphql";

interface WrappedObjectType extends GraphQLObjectType {
  _authFieldWrapped?: boolean;
}

interface WrappedInterfaceType extends GraphQLInterfaceType {
  _authFieldWrapped?: boolean;
}

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(object: GraphQLObjectType): GraphQLObjectType | void | null {
    this.ensureFieldsWrapped(object);
  }

  visitFieldDefinition(field: GraphQLField<any, any>, details: { objectType: GraphQLObjectType | GraphQLInterfaceType }): GraphQLField<any, any> | void | null {
    this.ensureFieldsWrapped(details.objectType);
  }

  ensureFieldsWrapped(objectType: WrappedObjectType | WrappedInterfaceType) {
    if (objectType._authFieldWrapped) return;
    objectType._authFieldWrapped = true;

    const fields = objectType.getFields();
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async (...args) => {
        const context = args[2];
        console.log(context);
        const user = context.user;

        if (!user) throw new AuthenticationError('You need to be authenticated');
        return resolve.apply(this, args);
      }
    });
  }
}

export default AuthDirective;
