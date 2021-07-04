import { Resolvers } from '@graphql-lab/schema/types';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/User';

const UserResolvers: Resolvers = {
  User: {
    passwords: (parent) => {
      return parent.passwords;
    },
  },
  Query: {
    me: (parent, args, context) => {
      const repository = getCustomRepository(UserRepository);
      return repository.findOneOrFail(context.user.id, {
        relations: ['passwords'],
      });
    },
  },
  Mutation: {
    newUser: (parent, { input }) => {
      const repository = getCustomRepository(UserRepository);
      const user = repository.create(input);
      user.receiveNewPlainTextPassword(input.plainTextPassword);
      return repository.save(user);
    },
    updateProfile: async (parent, { input }, context, info) => {
      const repository = getCustomRepository(UserRepository);
      const user = await repository.findOneOrFail(context.user.id);
      const { email, plainTextPassword, firstName, lastName } = input;
      if (email) user.email = email;
      if (plainTextPassword) {
        user.receiveNewPlainTextPassword(plainTextPassword);
      }
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      return repository.save(user);
    },
  },
};

export default UserResolvers;
