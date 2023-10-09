import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MeetingRoom {
  @PrimaryGeneratedColumn({
    comment: 'meeting room id',
  })
  id: number;

  @Column({
    length: 50,
    comment: 'meeting room name',
  })
  name: string;
  @Column({})
  capacity: number;

  @Column({
    length: 50,
  })
  location: string;

  @Column({
    length: 50,
    default: '',
  })
  equipment: string;

  @Column({
    length: 100,
    default: '',
  })
  description: string;

  @Column({
    default: false,
  })
  isBooked: boolean;

  @CreateDateColumn({})
  createTime: Date;

  @UpdateDateColumn({})
  updateTime: Date;
}
