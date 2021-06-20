import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hash, compare } from 'bcryptjs';

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

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;

  plainTextPassword!: string | undefined;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (!this.plainTextPassword) throw new Error('No password provided');
    this.password = await hash(this.plainTextPassword, 10);
  }

  @BeforeUpdate()
  async updatePassword(): Promise<void> {
    if (this.plainTextPassword) {
      this.password = await hash(this.plainTextPassword, 10);
    }
  }

  checkPassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.password);
  }
}
