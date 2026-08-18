import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { BusinessModule } from './business/business.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [AuthModule, CustomerModule, BusinessModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true, validationSchema: Joi.object({
      SALT_ROUNDS: Joi.number().integer().min(4).max(15).default(15),
      JWT_SECRET: Joi.string().required(),
      DATABASE_URL: Joi.string().required(),
    }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
