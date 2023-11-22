import { z } from 'zod';
import {
  PolicyDocumentSchema,
  PolicyDocumentArraySchema,
  StatementArraySchema,
  StatementSchema,
} from '../utils/zod-types/aws-policy';

export type Statement = z.infer<typeof StatementSchema>;
export type StatementArray = z.infer<typeof StatementArraySchema>;
export type PolicyDocument = z.infer<typeof PolicyDocumentSchema>;
export type PolicyDocumentArray = z.infer<typeof PolicyDocumentArraySchema>;
