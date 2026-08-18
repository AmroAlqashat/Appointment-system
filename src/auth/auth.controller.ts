import { Controller, Get, Render, Query, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerSignupDto } from './dto/customer-signup.dto';
import { BusinessSignupDto } from './dto/business-signup.dto';
import { BusinessCategory } from '@prisma/client';
import { businessCategoryLabels } from '../common/helper/business-category-labels';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('login')
  @Render('pages/auth/login')
  renderLoginPage() {
    return {};
  }

  @Get('signup/customer')
  @Render('pages/auth/signup-customer')
  renderCustomerSignup() {
    return {};
  }

  @Get('signup/business')
  @Render('pages/auth/signup-business')
  renderBusinessSignup() {
    const categories = Object.values(BusinessCategory).map((key) => ({
      value: key,
      label: businessCategoryLabels[key]
    }));
    return { categories };
  }

  @Post('signup/customer')
  customerSignup(@Body() customerSignupDto: CustomerSignupDto) {
    return this.authService.createCustomer(customerSignupDto);
  }

  @Post('signup/business')
  businessSignup(@Body() businessSignupDto: BusinessSignupDto) {
    return this.authService.createBusiness(businessSignupDto);
  }
}
