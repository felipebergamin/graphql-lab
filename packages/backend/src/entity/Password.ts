import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './User';

@Entity('passwords')
export class Password {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  serviceUrl!: string;

  @Column()
  serviceName!: string;

  @Column('varchar')
  extraDescription!: string | null;

  @Column()
  password!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.passwords)
  user!: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
