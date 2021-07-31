// PAULK
// This is a hook for the post method
// to verify all incoming post payload is a base64 string and store as a base64 binary data

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { HookContext } from '@feathersjs/feathers';
import { isBase64String } from '../helper/dataHelper';
import logger from '../logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (context: HookContext): Promise<HookContext> => {
  const { data } = context;

  if (isBase64String(data.data)) {
    // do nothing as it is a json base64 binary data
  } else {
    logger.error('Data was not created as it is not a json base64 string');
    // Prevent from creating into database
    context.result = 'Data was not created as it is not a json base64 string';
    context.data = {};
  }

  return context;
};
