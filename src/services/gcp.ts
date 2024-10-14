import { ChatOpenAI } from 'langchain/chat_models/openai';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import JSONSchemas from '../utils/json-schemas';
import ZodSchemas from '../utils/zod-types';
import { GCPTypes } from '../types';
import prompts from '../utils/prompts';
import CloudProviders from '../utils/cloud-providers';

const defaultModelName = 'gpt-4';

export async function getPermissionsFromCode(
  code: string,
  modelName: string = defaultModelName
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
    prompts[CloudProviders.gcp].DETECT_PERMISSIONS_PROMPT.pipe(
      functionCallingModel
    ).pipe(outputParser);

  const response = await chain.invoke({
    code,
  });

  const validResponse =
    ZodSchemas.gcp.PermissionsOpenAIResultSchema.parse(response);

  return validResponse.permissions;
}

export async function getCustomRolesFromPermissions(
  permissions: GCPTypes.PermissionArray,
  modelName: string = defaultModelName
) {
  if (!permissions.length) {
    return;
  }

  const llm = new ChatOpenAI({ modelName, temperature: 0 });
  const functionCallingModel = llm.bind({
    functions: [
      {
        name: 'custom_roles_output_formatter',
        description:
          "Formats the output to be an JSON-parseable object containing an array of Google Cloud IAM permissions under the key 'customRoles'",
        parameters: JSONSchemas.gcp.customRolesOpenAIResultSchema,
      },
    ],
    function_call: {
      name: 'custom_roles_output_formatter',
    },
  });

  const outputParser = new JsonOutputFunctionsParser();
  const chain =
    prompts.gcp.GENERATE_CUSTOM_ROLES_PROMPT.pipe(functionCallingModel).pipe(
      outputParser
    );

  const response = await chain.invoke({
    permissions: JSON.stringify(permissions, null, 2),
  });

  const validResponse =
    ZodSchemas.gcp.CustomRolesOpenAIResultSchema.parse(response);

  return validResponse.customRoles;
}
