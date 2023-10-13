import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/entities/role.entity';
import { Permission } from 'src/user/entities/permission.entity';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          entities: [User, Role, Permission, MeetingRoom],

          // NOTE: indicates if database schema should be auto created
          // on every application launch. Be careful with this
          //  option and don't use this in production -
          // otherwise you can lose production data.
          synchronize: true,
          // logging: process.env.NODE_ENV === 'development',
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
