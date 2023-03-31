import * as custom from '@/sdk/validators';
import { z } from 'zod';

export const outreachSequenceTemplate = custom.object({
  id: z.number(),
});

export type OutreachSequenceTemplate = z.infer<typeof outreachSequenceTemplate>;
