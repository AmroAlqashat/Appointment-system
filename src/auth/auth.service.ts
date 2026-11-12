import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import { buildWeeklyAvailability } from '../common/helper/build-weekly-availabilty';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessSignupDto } from './dto/business-signup.dto';
import { CustomerSignupDto } from './dto/customer-signup.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { BusinessLoginDto } from './dto/business-login.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds: number;

  constructor(
    private configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.saltRounds = this.configService.get<number>('SALT_ROUNDS')!; // Used ! because we impelemented Joi in app.module
  }

  async createCustomer(customerSignupDto: CustomerSignupDto) {
    const { firstName, lastName, email, password } = customerSignupDto;
    const lowerEmail = email.trim().toLowerCase();

    try {
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);

      const customer = await this.prisma.customer.create({
        data: {
          firstName,
          lastName,
          email: lowerEmail,
          password: hashedPassword,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return { customer, message: 'Customer created successfully' };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }

  async createBusiness(businessSignupDto: BusinessSignupDto) {
    const {
      ownerFirstName,
      ownerLastName,
      email,
      password,
      businessName,
      businessCategory,
      description,
      address,
      openingTime,
      closingTime,
    } = businessSignupDto;

    const lowerEmail = email.trim().toLowerCase();

    if (openingTime >= closingTime) {
      throw new BadRequestException('Closing time must be after opening time');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);

      const result = await this.prisma.$transaction(async (tx) => {
        const business = await tx.business.create({
          data: {
            ownerFirstName,
            ownerLastName,
            email: lowerEmail,
            password: hashedPassword,
            businessName,
            businessCategory,
            address,
            description,
          },
          select: {
            id: true,
            ownerFirstName: true,
            ownerLastName: true,
            email: true,
            businessName: true,
            businessCategory: true,
            address: true,
            description: true,
            rating: true,
            reviewCount: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        await tx.availability.createMany({
          data: buildWeeklyAvailability(business.id, openingTime, closingTime),
        });

        return { business, message: 'Business created successfully' };
      });

      return result;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }

  async loginCustomer(customerLoginDto: CustomerLoginDto) {
    const { email, password } = customerLoginDto;
    const lowerEmail = email.trim().toLowerCase();

    const customer = await this.prisma.customer.findUnique({
      where: { email: lowerEmail },
      select: { password: true },
    });

    if (!customer) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { message: 'Credentials verified successfully' };
  }

  async loginBusiness(businessLoginDto: BusinessLoginDto) {
    const { email, password } = businessLoginDto;
    const lowerEmail = email.trim().toLowerCase();

    const business = await this.prisma.business.findUnique({
      where: { email: lowerEmail },
      select: { password: true },
    });

    if (!business) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, business.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { message: 'Credentials verified successfully' };
  }
}
