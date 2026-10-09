import { z } from 'zod';
import { REQUEST_STATUSES } from '@/types';

export const changelogInputSchema = z.object({
  projectId: z.string().trim().min(1),
  version: z.string().trim().min(1),
  title: z.string().trim().min(1),
  notes: z.array(z.string().trim().min(1)).min(1),
});

export const requestStatusSchema = z.enum(REQUEST_STATUSES);
