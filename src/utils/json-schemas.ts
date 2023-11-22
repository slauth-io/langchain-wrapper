import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  StatementsOpenAIResultSchema,
  PolicyDocumentsOpenAIResultSchema,
} from './zod-types/aws-policy';

export default {
  statementsOpenAIResultSchema: zodToJsonSchema(StatementsOpenAIResultSchema),
  policyDocumentsOpenAIResultSchema: zodToJsonSchema(
    PolicyDocumentsOpenAIResultSchema
  ),
};
