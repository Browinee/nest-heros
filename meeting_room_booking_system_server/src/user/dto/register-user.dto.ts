import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @ApiProperty()
  username: string;

  @IsNotEmpty({
    message: 'nickname is required',
  })
  @ApiProperty()
  nickName: string;

  @IsNotEmpty({
    message: 'password is required',
  })
  @MinLength(6, {
    message: 'password should longer than 6',
  })
  @ApiProperty()
  password: string;

  @IsNotEmpty({
    message: 'email is required',
  })
  @IsEmail(
    {},
    {
      message: 'invalid email',
    },
  )
  @ApiProperty()
  email: string;

  @IsNotEmpty({
    message: 'captcah is required',
  })
  @ApiProperty()
  captcha: string;
}
