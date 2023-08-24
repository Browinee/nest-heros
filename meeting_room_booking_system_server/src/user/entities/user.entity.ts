import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: 'username',
  })
  username: string;

  @Column({
    length: 50,
    comment: 'password',
    select: false,
  })
  password: string;
  @Column({
    name: 'nick_name',
    length: 50,
    comment: '',
  })
  nickName: string;

  @Column({
    comment: '',
    length: 50,
  })
  email: string;

  @Column({
    comment: '',
    length: 100,
    nullable: true,
  })
  headPic: string;

  @Column({
    comment: '',
    length: 20,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    comment: '',
    default: false,
  })
  isFrozen: boolean;

  @Column({
    comment: '',
    default: false,
  })
  isAdmin: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
  })
  roles: Role[];
}
