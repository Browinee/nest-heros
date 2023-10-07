import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  headPic: string;

  @ApiProperty()
  nickName: string;

  @IsNotEmpty({
    message: 'email is empty',
  })
  @IsEmail(
    {},
    {
      message: 'email is invalid',
    },
  )
  @ApiProperty()
  email: string;

  @IsNotEmpty({
    message: 'captcha is empty',
  })
  @ApiProperty()
  captcha: string;
}
