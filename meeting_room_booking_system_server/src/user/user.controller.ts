import { ConfigService } from '@nestjs/config';
import {
  UnauthorizedException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AllowAnon } from 'src/decorators/allow-anon.decorator';
import { UserInfo } from 'src/decorators/user-info.decorator';
import { UserDetailVo } from './vo/user-info.vo';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { get } from 'http';
import { ParseIntPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { LoginUserVo } from './vo/login-user.to';
import { RefreshTokenVo } from './vo/refresh-token.vo';

@ApiTags('User management')
@Controller('user')
export class UserController {
  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'captcha is overdue/captcha is invalid/user existed',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'register successfully/fail to register',
    type: String,
  })
  @Post('register')
  @AllowAnon()
  register(@Body() registerUser: RegisterUserDto) {
    return this.userService.register(registerUser);
  }
  @Get('init-data')
  @AllowAnon()
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @ApiQuery({
    name: 'address',
    type: String,
    description: 'email',
    required: true,
    example: 'xxx@xx.com',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'send successfully',
    type: String,
  })
  @Get('register-captcha')
  @AllowAnon()
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${address}`, code, 10 * 60);

    // await this.emailService.sendMail({
    //   to: address,
    //   subject: 'Your verification code',
    //   html: `<p>Your verification code is  ${code}</p>`,
    // });
    return 'success';
  }

  @Post('login')
  @AllowAnon()
  @ApiBody({
    type: LoginUserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'password is not correct/user is not existed',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'userinfo and token',
    type: LoginUserVo,
  })
  async userLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser, false);
    vo.accessToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
        username: vo.userInfo.username,
        roles: vo.userInfo.roles,
        permissions: vo.userInfo.permissions,
      },
      {
        expiresIn:
          this.configService.get('jwt_access_token_expires_time') || '30m',
      },
    );
    vo.refreshToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
      },
      {
        expiresIn:
          this.configService.get('jwt_refresh_token_expres_time') || '7d',
      },
    );
    return vo;
  }

  @Post('admin/login')
  @AllowAnon()
  async adminLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser, true);
    return vo;
  }

  @Get('refresh')
  @ApiQuery({
    name: 'refreshToken',
    type: String,
    description: 'refresh token',
    required: true,
    example: 'xxxxxxxxyyyyyyyyzzzzz',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'token is invalid, please login',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'refresh successfully',
    type: RefreshTokenVo,
  })
  async refresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.findUserById(data.userId, false);

      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
          roles: user.roles,
          permissions: user.permissions,
        },
        {
          expiresIn:
            this.configService.get('jwt_access_token_expires_time') || '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn:
            this.configService.get('jwt_refresh_token_expres_time') || '7d',
        },
      );
      const vo = new RefreshTokenVo();

      vo.access_token = access_token;
      vo.refresh_token = refresh_token;

      return vo;
    } catch (e) {
      throw new UnauthorizedException('invalid token, please login again.');
    }
  }
  @Get('admin/refresh')
  async adminRefresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.findUserById(data.userId, true);

      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
          roles: user.roles,
          permissions: user.permissions,
        },
        {
          expiresIn:
            this.configService.get('jwt_access_token_expires_time') || '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn:
            this.configService.get('jwt_refresh_token_expres_time') || '7d',
        },
      );

      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('invalid token, please login again.');
    }
  }

  @Get('info')
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'refresh successfully',
    type: UserDetailVo,
  })
  async info(@UserInfo('userId') userId: number) {
    const user = await this.userService.findUserDetailById(userId);
    // NOTE: 或是在this.userRepository.findOne新增select
    // ex: select: ['id', 'username', 'nickName', 'email', 'phoneNumber', 'isFrozen', 'headPic', 'createTime'],
    const vo = new UserDetailVo();
    vo.id = user.id;
    vo.email = user.email;
    vo.username = user.username;
    vo.headPic = user.headPic;
    vo.phoneNumber = user.phoneNumber;
    vo.nickName = user.nickName;
    vo.createTime = user.createTime;
    vo.isFrozen = user.isFrozen;

    return vo;
  }

  @Post(['update_password', 'admin/update_password'])
  async updatePassword(
    @UserInfo('userId') userId: number,
    @Body() passwordDto: UpdateUserPasswordDto,
  ) {
    return await this.userService.updatePassword(userId, passwordDto);
  }

  @Get('update/captcha')
  async updateCaptcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(
      `update_user_captcha_${address}`,
      code,
      10 * 60,
    );

    return 'send captcha to your email';
  }
  @Get('freeze')
  async freeze(@Query('id') userId: number) {
    await this.userService.freezeUserById(userId);
    return 'success';
  }

  @Get('list')
  async list(
    @Query(
      'pageNo',
      new DefaultValuePipe(1),
      new ParseIntPipe({
        exceptionFactory() {
          throw new BadRequestException('pageNo should be number');
        },
      }),
    )
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(5),
      new ParseIntPipe({
        exceptionFactory() {
          throw new BadRequestException('pageSize should be number');
        },
      }),
    )
    pageSize: number,
    @Query('username') username: string,
    @Query('nickName') nickName: string,
    @Query('email') email: string,
  ) {
    return await this.userService.findUsers(
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    );
  }
}
