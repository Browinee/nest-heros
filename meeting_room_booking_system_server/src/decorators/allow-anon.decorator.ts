import { SetMetadata } from '@nestjs/common';

export const ALLOW_ANON = 'allowAnon';
export const AllowAnon = () => SetMetadata(ALLOW_ANON, true);
export const RequireLogin = () => SetMetadata('require-login', true);

export const RequirePermission = (...permissions: string[]) =>
  SetMetadata('require-permission', permissions);
