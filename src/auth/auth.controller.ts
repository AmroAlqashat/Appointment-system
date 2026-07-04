import { Controller, Get, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import list from '../../views/list';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Render('pages/auth/login')
  login() {
    return { ...list.authLogin };
  }

  @Get('signup')
  @Render('pages/auth/signup')
  signup() {
    return { ...list.authSignup };
  }
}
