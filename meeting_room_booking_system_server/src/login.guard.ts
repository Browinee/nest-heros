import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Permission } from './user/entities/permission.entity';
import { ALLOW_ANON } from './decorators/allow-anon.decorator';
import { UnLoginException } from './filters/unlogin.filter';

interface JwtUserData {
  userId: number;
  username: string;
  email: string;
  roles: string[];
  permissions: Permission[];
}
declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowAnon = this.reflector.getAllAndOverride<boolean>(ALLOW_ANON, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (allowAnon) return true;
    // const requiredLogin = this.reflector.getAllAndOverride('require-login', [
    //   context.getClass(),
    //   context.getHandler(),
    // ]);
    // if (!requiredLogin) {
    //   return true;
    // }
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      // throw new UnLoginException('please login.');
      throw new UnauthorizedException('please login.');
    }
    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify<JwtUserData>(token);

      request.user = {
        userId: data.userId,
        username: data.username,
        email: data.email,
        roles: data.roles,
        permissions: data.permissions,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('invalid token, please login.');
    }
  }
}
