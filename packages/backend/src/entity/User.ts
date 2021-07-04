import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserInputError } from 'apollo-server';
import { hashSync, compare } from 'bcryptjs';

import { Password } from './Password';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt!: Date;

  @OneToMany(() => Password, (password) => password.user)
  passwords!: Password[];

  receiveNewPlainTextPassword(password: string): void {
    if (!password) throw new UserInputError('Invalid password');
    this.password = hashSync(password);
  }

  checkPassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.password);
  }
}
