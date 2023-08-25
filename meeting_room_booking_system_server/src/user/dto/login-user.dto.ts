import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: ' username is empty.',
  })
  @ApiProperty()
  username: string;

  @IsNotEmpty({
    message: 'password is empty',
  })
  @ApiProperty()
  password: string;
}
