import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;

  @IsNotEmpty({
    message: 'nickname is required',
  })
  nickName: string;

  @IsNotEmpty({
    message: 'password is required',
  })
  @MinLength(6, {
    message: 'password should longer than 6',
  })
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
  email: string;

  @IsNotEmpty({
    message: 'captcah is required',
  })
  captcha: string;
}
