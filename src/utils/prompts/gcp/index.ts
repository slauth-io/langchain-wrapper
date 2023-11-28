import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from 'langchain/prompts';

export const GCP_DETECT_PERMISSIONS_PROMPT = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(
      `
      Given a code snippet, generate a JSON-parseable object containing an array of Google Cloud IAM Permissions required for the code's execution under the key 'permissions'. Follow these guidelines:

      1. Include only the permissions necessary for the code's execution.
      2. Adhere to the principle of least privilege.
      3. If no IAM permissions are required, return an object with an empty array ([]).
      4. Opt for the simplest solution if multiple exist.
      5. Do not assume Google Cloud service usage. If the code snippet doesn't explicitly indicate a Google Cloud service's usage, return an object with an empty array.
      6. Ensure the generated permissions are valid Google Cloud permissions and only include permissions for existing services. Exclude permissions for services from other cloud providers such as Amazon Web Services or Microsoft Azure.
      
      Note: The output should strictly be a JSON-parseable object with the key 'permissions' containing an array of Google Cloud permissions. Exclude any additional text, instructions, or non-JSON content.
      
      Analyze the provided Google Cloud SDK code snippet and generate a JSON-parseable array.
      
      ** Very Important!: ** Always cross-check the generated permissions with the official Google Cloud IAM documentation for the service to ensure the permissions exist. If they don't exist, replace them with the correct ones from the documentation page.
      `
    ),
    HumanMessagePromptTemplate.fromTemplate(`
    <codeSnippet>
    {code}
    </codeSnippet>`),
  ],
  inputVariables: ['code'],
});
