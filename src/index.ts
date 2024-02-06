import { type Express } from 'express';
import { Assembler } from './infraestructure/assembler';
import { PORT, TAG } from './utils/consts';
import { createRouter } from './infraestructure/express';

const router: Express = createRouter();

const assembler = new Assembler(router);
assembler.configureApp();

router.listen(PORT, () => {
  console.log(`${TAG} is listening on port ${PORT}`);
});
