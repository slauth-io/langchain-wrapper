import { z } from 'zod';

export const ArrayOfPermissionsSchema = z.array(z.string());

export const PermissionsOpenAIResultSchema = z.object({
  permissions: ArrayOfPermissionsSchema,
});

export const CustomRoleSchema = z.object({
  title: z.string(),
  description: z.string(),
  stage: z.enum(['ALPHA', 'BETA', 'GA']),
  includedPermissions: ArrayOfPermissionsSchema,
});

export const CustomRolesOpenAIResultSchema = z.object({
  customRoles: z.array(CustomRoleSchema),
});
