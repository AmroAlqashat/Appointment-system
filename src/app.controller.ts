import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import list from '../views/list';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('pages/landing')
  root() {
    return { message: list.landingMessage };
  }
}
