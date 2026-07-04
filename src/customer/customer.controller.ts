import { Controller, Get, Render, Query } from '@nestjs/common';
import list from '../../views/list';
import { FilterAppointmentsDto } from './dto/filter-appointments.dto';

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

    const filteredAppointments = list.profileAppointments.filter(
      (appointment) => appointment.isUpcoming === true,
    );

    const upcoming = list.profileAppointments.filter(
      (appointment) => appointment.isUpcoming,
    ).length;
    const past = list.profileAppointments.length - upcoming;

    return {
      customer: list.profileCustomer,
      counts: { upcoming, past },
      appointments: filteredAppointments,
    };
  }

  @Get('profile/appointments')
  @Render('partials/appointments-list')
  filterAppointments(@Query() filterDto: FilterAppointmentsDto) {
    const { isUpcoming } = filterDto;

    const filteredAppointments = list.profileAppointments.filter(
      (appointment) => appointment.isUpcoming === isUpcoming,
    );

    return {
      appointments: filteredAppointments,
      layout: false,
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
