import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateMeetingRoomDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'meeting room is empty'
    })
    @MaxLength(10, {
        message: 'meeting room name length should be <=10'
    })
    name: string;

    @ApiProperty()
    @IsNotEmpty({
        message: 'capaity is empty'
    })
    capacity: number;

    @ApiProperty()
    @IsNotEmpty({
        message: 'location is empty'
    })
    @MaxLength(50, {
        message: 'location max length is 50'
    })
    location: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50, {
        message: 'equipment max length is 50'
    })
    equipment: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100, {
        message: 'description max length is100',
    })
    description: string;

}
