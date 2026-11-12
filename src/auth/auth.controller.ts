import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerSignupDto } from './dto/customer-signup.dto';
import { BusinessSignupDto } from './dto/business-signup.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { BusinessLoginDto } from './dto/business-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup/customer')
  async customerSignup(@Body() customerSignupDto: CustomerSignupDto) {
    return this.authService.createCustomer(customerSignupDto);
  }

  @Post('signup/business')
  businessSignup(@Body() businessSignupDto: BusinessSignupDto) {
    return this.authService.createBusiness(businessSignupDto);
  }

  @Post('login/customer')
  async customerLogin(@Body() customerLoginDto: CustomerLoginDto) {
    return this.authService.loginCustomer(customerLoginDto);
  }

  @Post('login/business')
  async businessLogin(@Body() businessLoginDto: BusinessLoginDto) {
    return this.authService.loginBusiness(businessLoginDto);
  }
}
