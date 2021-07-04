import { EntityRepository, Repository } from 'typeorm';

import { Password } from '../entity/Password';

@EntityRepository(Password)
class PasswordRepository extends Repository<Password> {}

export default PasswordRepository;
