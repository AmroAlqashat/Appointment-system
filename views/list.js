export default {
  // ── AppController ──
  landingMessage: 'hello world',

  // ── AuthController ──
  authLogin: { username: 'new user', password: '' },
  authSignup: { username: 'new user', password: '', confirmPassword: '' },

  // ── BusinessController ──
  dashboardBusiness: { name: 'Ahmad Dental' },

  dashboardStats: [
    { label: 'Revenue', value: '$4,320', delta: '+12% vs last week', positive: true },
    { label: 'Appointments', value: '38', delta: '+5 this week', positive: true },
    { label: 'New clients', value: '14', delta: '+3 from yesterday', positive: true },
    { label: 'Cancellations', value: '2', delta: 'Steady this week', positive: false },
  ],

  dashboardAppointments: [
    { id: 201, month: 'MAY', day: '08', service: 'Dental Cleaning', timeLabel: '10:00 AM', customer: { name: 'Sara Ali' } },
    { id: 202, month: 'MAY', day: '09', service: 'Teeth Whitening', timeLabel: '01:30 PM', customer: { name: 'Omar Khaled' } },
    { id: 203, month: 'MAY', day: '10', service: 'Consultation', timeLabel: '04:00 PM', customer: { name: 'Lina Samir' } },
  ],

  dashboardCalendar: {
    monthLabel: 'May 2026',
    prev: '2026-04',
    next: '2026-06',
    weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    days: [
      { day: 26, iso: '2026-04-26', outside: true, today: false, hasAppointments: false },
      { day: 27, iso: '2026-04-27', outside: true, today: false, hasAppointments: false },
      { day: 28, iso: '2026-04-28', outside: true, today: false, hasAppointments: true },
      { day: 29, iso: '2026-04-29', outside: true, today: false, hasAppointments: false },
      { day: 30, iso: '2026-04-30', outside: true, today: false, hasAppointments: false },
      { day: 1, iso: '2026-05-01', outside: false, today: false, hasAppointments: false },
      { day: 2, iso: '2026-05-02', outside: false, today: false, hasAppointments: false },
      { day: 3, iso: '2026-05-03', outside: false, today: false, hasAppointments: false },
      { day: 4, iso: '2026-05-04', outside: false, today: false, hasAppointments: true },
      { day: 5, iso: '2026-05-05', outside: false, today: false, hasAppointments: false },
      { day: 6, iso: '2026-05-06', outside: false, today: false, hasAppointments: false },
      { day: 7, iso: '2026-05-07', outside: false, today: true, hasAppointments: true },
      { day: 8, iso: '2026-05-08', outside: false, today: false, hasAppointments: true },
      { day: 9, iso: '2026-05-09', outside: false, today: false, hasAppointments: true },
      { day: 10, iso: '2026-05-10', outside: false, today: false, hasAppointments: true },
      { day: 11, iso: '2026-05-11', outside: false, today: false, hasAppointments: false },
      { day: 12, iso: '2026-05-12', outside: false, today: false, hasAppointments: false },
      { day: 13, iso: '2026-05-13', outside: false, today: false, hasAppointments: true },
      { day: 14, iso: '2026-05-14', outside: false, today: false, hasAppointments: false },
      { day: 15, iso: '2026-05-15', outside: false, today: false, hasAppointments: false },
      { day: 16, iso: '2026-05-16', outside: false, today: false, hasAppointments: false },
      { day: 17, iso: '2026-05-17', outside: false, today: false, hasAppointments: false },
      { day: 18, iso: '2026-05-18', outside: false, today: false, hasAppointments: false },
      { day: 19, iso: '2026-05-19', outside: false, today: false, hasAppointments: true },
      { day: 20, iso: '2026-05-20', outside: false, today: false, hasAppointments: false },
      { day: 21, iso: '2026-05-21', outside: false, today: false, hasAppointments: false },
      { day: 22, iso: '2026-05-22', outside: false, today: false, hasAppointments: false },
      { day: 23, iso: '2026-05-23', outside: false, today: false, hasAppointments: false },
      { day: 24, iso: '2026-05-24', outside: false, today: false, hasAppointments: false },
      { day: 25, iso: '2026-05-25', outside: false, today: false, hasAppointments: false },
      { day: 26, iso: '2026-05-26', outside: false, today: false, hasAppointments: true },
      { day: 27, iso: '2026-05-27', outside: false, today: false, hasAppointments: false },
      { day: 28, iso: '2026-05-28', outside: false, today: false, hasAppointments: false },
      { day: 29, iso: '2026-05-29', outside: false, today: false, hasAppointments: false },
      { day: 30, iso: '2026-05-30', outside: false, today: false, hasAppointments: false },
      { day: 31, iso: '2026-05-31', outside: false, today: false, hasAppointments: false },
      { day: 1, iso: '2026-06-01', outside: true, today: false, hasAppointments: false },
      { day: 2, iso: '2026-06-02', outside: true, today: false, hasAppointments: false },
      { day: 3, iso: '2026-06-03', outside: true, today: false, hasAppointments: false },
      { day: 4, iso: '2026-06-04', outside: true, today: false, hasAppointments: false },
      { day: 5, iso: '2026-06-05', outside: true, today: false, hasAppointments: false },
      { day: 6, iso: '2026-06-06', outside: true, today: false, hasAppointments: false },
    ],
  },

  dashboardAvailability: { booked: 12, free: 8, percent: 60 },

  detailsBusiness: {
    id: 1,
    initials: 'AD',
    category: 'Health & Wellness',
    name: 'Ahmad Dental',
    rating: '4.8',
    reviewCount: '200',
    address: '55 Ahmad Street',
    opensAt: '09:00 AM',
    closesAt: '05:00 PM',
    slotDuration: 30,
    description: 'Friendly dental clinic offering cleanings, whitening, and consultations with modern equipment.',
  },

  // ── CustomerController ──
  customer: { firstName: 'Amro', initials: 'sdfsdf', email: 'email@example.com' },

  profileCustomer: { initials: 'AA', fullName: 'Amro Ahmad', email: 'amro.ahmad@example.com' },

  editProfileCustomer: {
    initials: 'AA',
    firstName: 'Amro',
    lastName: 'Ahmad',
    email: 'amro.ahmad@example.com',
    phone: '+962790000000',
  },

  profileAppointments: [
    {
      id: 101, month: 'MAY', day: '09', service: 'Dental Cleaning',
      timeLabel: '10:00 AM', isUpcoming: true,
      business: { id: 1, name: 'Ahmad Dental', address: '55 Ahmad Street' },
    },
    {
      id: 102, month: 'APR', day: '28', service: 'Haircut',
      timeLabel: '02:30 PM', isUpcoming: false,
      business: { id: 2, name: 'Beauty Salon', address: '123 Main Street' },
    },
  ],

  categories: [
    'Hair & Beauty',
    'Health & Wellness',
    'Fitness & Training',
    'Consulting',
    'Auto Services',
  ],

  businesses: [
    { id: 1, name: 'Ahmad Dental', firstLetter: 'A', category: 'Health & Wellness', distanceInKM: '5', description: 'Dental Cleaning, Root Canal', rating: '4.5', reviewCount: '200' },
    { id: 2, name: 'Beauty Salon', firstLetter: 'B', category: 'Hair & Beauty', distanceInKM: '3', description: 'Haircuts, Styling, Makeup', rating: '4.7', reviewCount: '150' },
    { id: 3, name: 'Fitness Center', firstLetter: 'F', category: 'Fitness & Training', distanceInKM: '7', description: 'Yoga, Pilates, Weightlifting', rating: '4.6', reviewCount: '180' },
  ],

  bookings: [
    { id: 1, business: 'Ahmad Dental', service: 'Dental Cleaning', date: '2023-06-15', location: '55 Ahmad Street', isDone: false },
    { id: 2, business: 'Beauty Salon', service: 'Haircut', date: '2023-06-16', location: '123 Main Street', isDone: true },
  ],
};

