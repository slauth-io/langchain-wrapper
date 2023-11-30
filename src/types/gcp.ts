import { z } from 'zod';
import ZodSchemas from '../utils/zod-types';

export type PermissionArray = z.infer<
  typeof ZodSchemas.gcp.ArrayOfPermissionsSchema
>;
