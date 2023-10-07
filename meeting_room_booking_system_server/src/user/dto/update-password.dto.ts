import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty({
    message: 'username is empty',
  })
  @ApiProperty()
  username: string;

  @IsNotEmpty({
    message: 'password is empty',
  })
  @MinLength(6, {
    message: 'password is less than 6',
  })
  password: string;

  @IsNotEmpty({
    message: 'email is empty',
  })
  @IsEmail(
    {},
    {
      message: 'email is invalid',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'captch is empty',
  })
  captcha: string;
}
