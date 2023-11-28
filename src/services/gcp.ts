import { ChatOpenAI } from 'langchain/chat_models/openai';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import JSONSchemas from '../utils/json-schemas';
import prompts from '../utils/prompts';
import { GCPPermissionsOpenAIResultSchema } from '../utils/zod-types/gcp-permissions';
import CloudProviders from '../utils/cloud-providers';
import OpenAIModels from '../utils/models';

const defaultModelName = OpenAIModels['gpt-4-32k'];

export async function getPermissionsFromCode(
  code: string,
  modelName: keyof typeof OpenAIModels = defaultModelName
) {
  const llm = new ChatOpenAI({ modelName, temperature: 0 });
  const functionCallingModel = llm.bind({
    functions: [
      {
        name: 'permissions_output_formatter',
        description:
          "Formats the output to be an JSON-parseable object containing an array of GCP Permissions under the key 'permissions'",
        parameters: JSONSchemas.gcp.permissionsOpenAIResultSchema,
      },
    ],
    function_call: {
      name: 'permissions_output_formatter',
    },
  });

  const outputParser = new JsonOutputFunctionsParser();
  const chain =
    prompts[CloudProviders.gcp].GCP_DETECT_PERMISSIONS_PROMPT.pipe(
      functionCallingModel
    ).pipe(outputParser);

  const response = await chain.invoke({
    code,
  });

  const validResponse = GCPPermissionsOpenAIResultSchema.parse(response);

  return validResponse.permissions;
}
