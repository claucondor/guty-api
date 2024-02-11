import * as dotenv from 'dotenv';
import { logger } from '../../utils/log';
dotenv.config();

const MONDAY_API_KEY = process.env['MONDAY_API_KEY'];

function validateRequiredEnvs() {
  if (!MONDAY_API_KEY) stopProgram('MONDAY_API_KEY');

  console.log('MONDAY_API_KEY:', MONDAY_API_KEY);
}

function stopProgram(envKey: string) {
  logger.fatal(`no ${envKey} specified in enviroment variable`);
  process.exit(1);
}

export { validateRequiredEnvs, stopProgram, MONDAY_API_KEY };
