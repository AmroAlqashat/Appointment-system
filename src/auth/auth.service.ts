import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import { buildWeeklyAvailability } from '../common/helper/build-weekly-availabilty';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessSignupDto } from './dto/business-signup.dto';
import { CustomerSignupDto } from './dto/customer-signup.dto';


@Injectable()
export class AuthService {
  private readonly saltRounds: number;

  constructor(private configService: ConfigService, private readonly prisma: PrismaService) {
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
          password: hashedPassword
        }
      });

      return { customer, message: "Customer created sucessfully" };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
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
      closingTime
    } = businessSignupDto;

    const lowerEmail = email.trim().toLowerCase();

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
            description
          }
        });


        await tx.availability.createMany({
          data: buildWeeklyAvailability(business.id, openingTime, closingTime)
        });

        return { business, message: "Business created sucessfully" };
      });

      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email already in use');
      }
      throw error;
    }
  }
}
