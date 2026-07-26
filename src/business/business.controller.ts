import { Controller, Get, Render, Param, Post, Query } from '@nestjs/common';
import { BusinessService } from './business.service';
import { SearchBusinessDto } from './dto/search-business.dto';

@Controller('business')
export class BusinessController {
//   constructor(private readonly businessService: BusinessService) {}

//   @Get('dashboard')
//   @Render('pages/business/dashboard')
//   renderDashboard() {
//     return {
//       business: list.dashboardBusiness,
//       stats: list.dashboardStats,
//       appointments: list.dashboardAppointments,
//       calendar: list.dashboardCalendar,
//       availability: list.dashboardAvailability,
//     };
//   }

//  @Get('search')
//  @Render('partials/business-grid')
//  searchBusinesses(@Query() searchDto: SearchBusinessDto) {
//     const { q = '', category = '' } = searchDto;
    
//     const filteredBusinesses = list.businesses.filter((business) => {
//       const matchesQuery = q ? business.name.toLowerCase().includes(q.toLowerCase()) : true;
//       const matchesCategory = category ? business.category === category : true;
//       return matchesQuery && matchesCategory;
//     });
//     return { businesses: filteredBusinesses, layout: false };
//   } 

//   @Get('details/:id')
//   @Render('pages/business/details')
//   renderDetails(@Param('id') id: string) {
//     const today = new Date().toISOString().slice(0, 10);
//     return {
//       today,
//       business: list.detailsBusiness,
//       id,
//     };
//   }

//   @Get('services/new')
//   @Render('pages/business/new-service')
//   renderNewService() {
//     return {
//       business: list.dashboardBusiness,
//     };
//   }
}
