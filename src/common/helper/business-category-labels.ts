import { BusinessCategory } from "@prisma/client";

export const businessCategoryLabels: Record<BusinessCategory, string> = {
  HAIR_AND_BEAUTY: 'Hair & Beauty',
  HEALTH_AND_WELLNESS: 'Health & Wellness',
  FITNESS_AND_TRAINING: 'Fitness & Training',
  CONSULTING: 'Consulting',
  AUTO_SERVICES: 'Auto Service'
};