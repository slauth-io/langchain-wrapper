import { z } from 'zod';

export const GCPPermissionsOpenAIResultSchema = z.object({
  permissions: z.array(z.string()),
});
