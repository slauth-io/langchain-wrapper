import { ChatOpenAI } from 'langchain/chat_models/openai';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import JSONSchemas from '../utils/json-schemas';
import ZodSchemas from '../utils/zod-types';
import prompts from '../utils/prompts';
import { AWSTypes } from '../types';

const defaultModelName = 'gpt-4';

export async function getStatementsFromCode(
  code: string,
  modelName: string = defaultModelName
) {
  const llm = new ChatOpenAI({ modelName, temperature: 0 });
  const functionCallingModel = llm.bind({
    functions: [
      {
        name: 'statements_output_formatter',
        description:
          "Formats the output to be an JSON-parseable object containing an array of AWS policy statements under the key 'statements'",
        parameters: JSONSchemas.aws.statementsOpenAIResultSchema,
      },
    ],
    function_call: {
      name: 'statements_output_formatter',
    },
  });

  const outputParser = new JsonOutputFunctionsParser();
  const chain =
    prompts.aws.DETECT_STATEMENTS_PROMPT.pipe(functionCallingModel).pipe(
      outputParser
    );

  const response = await chain.invoke({
    code,
  });

  const validResponse =
    ZodSchemas.aws.StatementsOpenAIResultSchema.parse(response);

  return validResponse.statements;
}

export async function getPoliciesFromStatements(
  statements: AWSTypes.StatementArray,
  modelName: string = defaultModelName
) {
  if (!statements.length) {
    return;
  }

  const llm = new ChatOpenAI({ modelName, temperature: 0 });
  const functionCallingModel = llm.bind({
    functions: [
      {
        name: 'policy_documents_output_formatter',
        description:
          "Formats the output to be an JSON-parseable object containing an array of AWS policy documents under the key 'policyDocuments'",
        parameters: JSONSchemas.aws.policyDocumentsOpenAIResultSchema,
      },
    ],
    function_call: {
      name: 'policy_documents_output_formatter',
    },
  });

  const outputParser = new JsonOutputFunctionsParser();
  const chain =
    prompts.aws.GENERATE_POLICIES_PROMPT.pipe(functionCallingModel).pipe(
      outputParser
    );

  const response = await chain.invoke({
    statements: JSON.stringify(statements, null, 2),
  });

  const validResponse =
    ZodSchemas.aws.PolicyDocumentsOpenAIResultSchema.parse(response);

  return validResponse.policyDocuments;
}
