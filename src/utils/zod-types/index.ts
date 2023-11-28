import CloudProviders from '../cloud-providers';
import * as AWSZodSchemas from './aws-policy';
import * as GCPZodSchemas from './gcp-permissions';
import { z } from 'zod';

type CloudProviderSchemas = {
  [k in CloudProviders]: {
    [k in string]: z.Schema;
  };
};

const Schemas: CloudProviderSchemas = {
  aws: AWSZodSchemas,
  gcp: GCPZodSchemas,
};

export default Schemas;
