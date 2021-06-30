import { Resolvers } from '@graphql-lab/schema/types';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/User';

const UserResolvers: Resolvers = {
  Query: {
    users: () => getCustomRepository(UserRepository).find(),
  },
  Mutation: {
    newUser: (parent, { input }) => {
      const repository = getCustomRepository(UserRepository);
      const user = repository.create(input);
      user.plainTextPassword = input.plainTextPassword;
      return repository.save(user);
    },
  },
};

export default UserResolvers;
