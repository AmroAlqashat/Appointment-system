import { Injectable, Inject } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerSignupDto } from './dto/customer-signup.dto';
import { BusinessSignupDto } from './dto/business-signup.dto';
import { ConfigService } from '@nestjs/config'
import bcrypt from 'bcrypt';
import { EmailInUseException } from '../common/exceptions/email-in-use.exception';
import { PasswordDontMatch } from 'src/common/exceptions/passwords-dont-match.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { buildWeeklyAvailability } from '../common/helper/build-weekly-availabilty';


@Injectable()
export class AuthService {
    private readonly saltRounds: number;

    constructor(private configService: ConfigService, private readonly prisma: PrismaService) {
        this.saltRounds = this.configService.get<number>('SALT_ROUNDS')!; // Used ! because we impelemented Joi in app.module 
    }

    async createCustomer(customerSignupDto: CustomerSignupDto) {
        const { firstName, lastName, email, password, confirmPassword } = customerSignupDto;

        if (password !== confirmPassword) throw new PasswordDontMatch()

        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);

            const customer = await this.prisma.customer.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword
                }
            });

            return "Customer created sucessfully";
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new EmailInUseException(email);
            }
            throw error;
        }
    }

    async createBusiness(businessSignupDto: BusinessSignupDto) {
        const { ownerFirstName,
            ownerLastName,
            email,
            password,
            confirmPassword,
            businessName,
            businessCategory,
            description,
            address,
            openingTime,
            closingTime
        } = businessSignupDto;

        if (password !== confirmPassword) throw new PasswordDontMatch();

        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);

            const business = await this.prisma.$transaction(async (tx) => {
                const business = await tx.business.create({
                    data: {
                        ownerFirstName,
                        ownerLastName,
                        email,
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

                return "Business created sucessfully";
            });

            return business;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new EmailInUseException(email);
            }
            throw error;
        }
    }
}
