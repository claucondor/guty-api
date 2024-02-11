import { type Express } from 'express';
import { Assembler } from './infraestructure/assembler';
import { PORT, TAG } from './utils/consts';
import { createRouter } from './infraestructure/express';
import { MondayClient } from './infraestructure/monday/client';
import { connectToMonday } from './infraestructure/monday';
import { validateRequiredEnvs } from './infraestructure/env';

validateRequiredEnvs();

const router: Express = createRouter();
const mondayClient: MondayClient = connectToMonday();

const assembler = new Assembler(router, mondayClient);
assembler.configureApp();

router.listen(PORT, () => {
  console.log(`${TAG} is listening on port ${PORT}`);
});
