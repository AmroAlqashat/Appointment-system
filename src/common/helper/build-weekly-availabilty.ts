export function buildWeeklyAvailability(businessId: number, openingTime: string, closingTime: string) {
  return Array.from({ length: 7 }, (_, dayOfWeek) => ({
    businessId,
    dayOfWeek,
    startTime: openingTime,
    endTime: closingTime
  }));
}