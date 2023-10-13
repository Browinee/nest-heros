import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// NOTE: https://tushar-chy.medium.com/jwt-refresh-token-generator-in-nestjs-application-54c5ab2c0da3
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {}
