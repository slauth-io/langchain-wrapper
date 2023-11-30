import * as gcp from './gcp';
import * as aws from './aws';
import CloudProviders from '../utils/cloud-providers';

type Services = {
  readonly [k in CloudProviders]: {
    [j in string]: unknown;
  };
};

const services: Services = {
  aws,
  gcp,
};

export default services;
