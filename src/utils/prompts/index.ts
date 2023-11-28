import { GCP_DETECT_PERMISSIONS_PROMPT } from './gcp';
import {
  AWS_DETECT_STATEMENTS_PROMPT,
  AWS_GENERATE_POLICIES_PROMPT,
} from './aws';

// Enforce all cloudproviders to have prompts
const cpPrompts = {
  aws: {
    DETECT_STATEMENTS_PROMPT: AWS_DETECT_STATEMENTS_PROMPT,
    GENERATE_POLICIES_PROMPT: AWS_GENERATE_POLICIES_PROMPT,
  },
  gcp: {
    GCP_DETECT_PERMISSIONS_PROMPT: GCP_DETECT_PERMISSIONS_PROMPT,
  },
};

export default cpPrompts;
