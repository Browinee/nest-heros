import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: ' username is empty.',
  })
  username: string;

  @IsNotEmpty({
    message: 'password is empty',
  })
  password: string;
}
