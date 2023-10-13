import { LoginGuard } from './login.guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permission.guard';
import { MeetingRoomModule } from './meeting-room/meeting-room.module';
import { MeetingRoom } from './meeting-room/entities/meeting-room.entity';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      // NOTE: If a variable is found in multiple files, the first one takes precedence.
      envFilePath: [envFilePath, '.env'],
      // validationSchema: Joi.object({
      //   DB: Joi.string().ip(),
      //   DB_HOST: Joi.string().ip(),
      //   DB_PORT: Joi.number().default(3306),
      //   DB_USER: Joi.string(),
      //   DB_PASSWORD: Joi.string(),
      //   DB_NAME: Joi.string(),
      //   LOG_LEVEL: Joi.string(),
      //   LOG_ON: Joi.bool(),
      // }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        console.log(
          "configService.get('mysql_server_host'),",
          configService.get('mysql_server_host'),
        );

        return {
          type: 'mysql',
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: true,
          logging: true,
          entities: [User, Role, Permission, MeetingRoom],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    RedisModule,
    EmailModule,
    MeetingRoomModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // NOTE: use global guard
    { provide: APP_GUARD, useClass: LoginGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class AppModule {}
