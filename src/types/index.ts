import { z } from 'zod';
import {
  PolicyDocumentSchema,
  StatementArraySchema,
  StatementSchema,
} from '../utils/zod-types/aws-policy';

export type Statement = z.infer<typeof StatementSchema>;
export type StatementArray = z.infer<typeof StatementArraySchema>;
export type PolicyDocument = z.infer<typeof PolicyDocumentSchema>;
