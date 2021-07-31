// PAULK
// This is a hook for the get method
// to compare the base64 binary data of the selected left and right data object
// hence, the param will have to contain the parameter leftData and rightData, both in base64 binary data

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { HookContext } from '@feathersjs/feathers';
import { doComparision, isBase64String } from '../helper/dataHelper';
import logger from '../logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (context: HookContext): Promise<HookContext> => {
  const { params } = context;
  const { query } = params;
  if (
    query &&
    query.leftData &&
    query.rightData &&
    isBase64String(query.leftData) &&
    isBase64String(query.rightData)
  ) {
    // Do comparision
    const result = doComparision(query.leftData, query.rightData);
    context.result = JSON.stringify(result);
  } else {
    // Logs a general message
    logger.error('Unable to do comparision');
    context.result = 'Unable to do comparision';
  }

  return context;
};
