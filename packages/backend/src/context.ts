import { getCustomRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { Config } from 'apollo-server';

import UserRepository from './repositories/User';
import { JWT_SIGN_KEY } from './constants';

const createApolloContext: Config['context'] = async ({ req }) => {
  try {
    const authorization = req.header('authorization');
    if (!authorization) return {};

    const repository = getCustomRepository(UserRepository);
    const [, token] = authorization.split(' ');
    const { iss } = verify(token, JWT_SIGN_KEY) as { iss: string }; // FIXME
    const user = await repository.findOne(iss);
    return {
      user,
    };
  } catch (err) {
    // TODO: add Sentry or something similar
    return {};
  }
};

export default createApolloContext;
