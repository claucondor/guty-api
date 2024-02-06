import * as dotenv from 'dotenv';
import { logger } from '../../utils/log';
dotenv.config();

function validateRequiredEnvs() {}

function stopProgram(envKey: string) {
  logger.fatal(`no ${envKey} specified in enviroment variable`);
  process.exit(1);
}

export { validateRequiredEnvs, stopProgram };
