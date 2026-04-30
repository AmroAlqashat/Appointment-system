import { Controller, Get, Render } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('dashboard')
  @Render('pages/customer/dashboard')
  findAll() {
    return {
      customer: { firstName: 'Amro' },
      categories: [
        'Hair & Beauty',
        'Health & Wellness',
        'Fitness & Training',
        'Consulting',
        'Auto Services',
      ],
      businesses: [
        {
          id: 1,
          name: 'Ahmad Dental',
          firstLetter: 'A',
          category: 'Health & Wellness',
          distanceInKM: '5',
          description: 'Dental Cleaning, Root Canal',
          rating: '4.5',
          reviewCount: '200',
        },
        {
          id: 2,
          name: 'Beauty Salon',
          firstLetter: 'B',
          category: 'Hair & Beauty',
          distanceInKM: '3',
          description: 'Haircuts, Styling, Makeup',
          rating: '4.7',
          reviewCount: '150',
        },
        {
          id: 3,
          name: 'Fitness Center',
          firstLetter: 'F',
          category: 'Fitness & Training',
          distanceInKM: '7',
          description: 'Yoga, Pilates, Weightlifting',
          rating: '4.6',
          reviewCount: '180',
        },
      ],
    };
  }
}
