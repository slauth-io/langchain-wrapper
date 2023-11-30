import CloudProviders from '../cloud-providers';
import { Schema } from 'zod';
import * as AWSZodSchemas from './aws';
import * as GCPZodSchemas from './gcp';

type Schemas = {
  readonly [k in CloudProviders]: {
    [j in string]: Schema;
  };
};

const ZodSchemas: Schemas = {
  aws: AWSZodSchemas,
  gcp: GCPZodSchemas,
};

export default ZodSchemas;
