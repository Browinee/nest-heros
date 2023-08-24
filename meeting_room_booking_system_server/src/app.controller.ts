import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SetMetadata } from '@nestjs/common';
import { RequireLogin, RequirePermission } from './custom.decorator';
import { AllowAnon } from './decorators/allow-anon.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowAnon()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @AllowAnon()
  @RequirePermission('ccc')
  aaaa() {
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
