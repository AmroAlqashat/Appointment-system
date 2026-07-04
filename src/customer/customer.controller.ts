import { Controller, Get, Render } from '@nestjs/common';
import list from '../../views/list';

@Controller('customer')
export class CustomerController {
  @Get('dashboard')
  @Render('pages/customer/dashboard')
  renderDashboard() {
    return {
      customer: list.customer,
      categories: list.categories,
      businesses: list.businesses,
    };
  }

  @Get('profile')
  @Render('pages/customer/profile')
  renderProfile() {
    const upcoming = list.profileAppointments.filter(
      (appointment) => appointment.upcoming,
    ).length;
    const past = list.profileAppointments.length - upcoming;

    return {
      customer: list.profileCustomer,
      counts: { upcoming, past },
      appointments: list.profileAppointments,
    };
  }

  @Get('profile/edit')
  @Render('pages/customer/edit')
  renderEditProfile() {
    return {
      customer: list.editProfileCustomer,
    };
  }
}
