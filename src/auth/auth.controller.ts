import { Controller, Get, Render } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Render('pages/auth/login')
  login() {
    return { username: 'new user', password: '' };
  }

  @Get('signup')
  @Render('pages/auth/signup')
  signup() {
    return { username: 'new user', password: '', confirmPassword: '' };
  }
}
