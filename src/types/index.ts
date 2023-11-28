import { z } from 'zod';
import ZodSchemas from '../utils/zod-types';

export type Statement = z.infer<typeof ZodSchemas.aws.StatementSchema>;
export type StatementArray = z.infer<
  typeof ZodSchemas.aws.StatementArraySchema
>;
export type PolicyDocument = z.infer<
  typeof ZodSchemas.aws.PolicyDocumentSchema
>;
export type PolicyDocumentArray = z.infer<
  typeof ZodSchemas.aws.PolicyDocumentArraySchema
>;
