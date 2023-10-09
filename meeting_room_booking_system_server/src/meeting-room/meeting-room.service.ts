import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MeetingRoom } from './entities/meeting-room.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MeetingRoomService {
  @InjectRepository(MeetingRoom)
  private repository: Repository<MeetingRoom>;

  initData() {
    const room1 = new MeetingRoom();
    room1.name = 'room1';
    room1.capacity = 10;
    room1.equipment = 'Whiteboard';
    room1.location = '1F';

    const room2 = new MeetingRoom();
    room2.name = 'room2';
    room2.capacity = 5;
    room2.equipment = 'TV';
    room2.location = '2F';

    const room3 = new MeetingRoom();
    room3.name = 'roo3';
    room3.capacity = 30;
    room3.equipment = 'Whiteboard, TV';
    room3.location = '3F';

    this.repository.insert([room1, room2, room3]);
  }
}
