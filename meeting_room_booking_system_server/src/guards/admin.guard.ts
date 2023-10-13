import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES } from 'src/enum';
import { UserService } from 'src/user/user.service';
/**
 *
 * Remember to import UserModule when using AdminGuard
 * because it uses userService
 * or make UserModule to @Global
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const req = context.switchToHttp().getRequest();
    // const user = await this.userService.find(req.user.username);
    // if (user.roles.find((role) => role.id === ROLES.ADMIN)) {
    //   return true;
    // }
    return false;
  }
}
