import { Resolvers } from '@graphql-lab/schema/types';
import { getCustomRepository } from 'typeorm';
import { UserInputError } from 'apollo-server';
import { sign } from 'jsonwebtoken';

import UserRepository from '../repositories/User';
import { JWT_SIGN_KEY } from '../constants';

const AuthResolvers: Resolvers = {
  Mutation: {
    authenticate: async (parent, { input }) => {
      const repository = getCustomRepository(UserRepository);
      const user = await repository.findOne({
        where: { email: input.email },
        select: ['password', 'id'],
      });

      if (!user) throw new UserInputError('Invalid credentials');
      const isValidCredentials = await user.checkPassword(
        input.plainTextPassword
      );
      if (!isValidCredentials) {
        throw new UserInputError('Invalid credentials');
      }

      const accessToken = sign(
        {
          iss: user.id,
        },
        JWT_SIGN_KEY
      );
      const wholeUserData = await repository.findOneOrFail(user.id);

      return {
        accessToken,
        user: wholeUserData,
      };
    },
  },
};

export default AuthResolvers;
