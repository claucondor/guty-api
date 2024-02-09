// Test
import { TestControllers } from '../../adapters/http/test/controller';
import { addTestRoutes } from '../../adapters/http/test/routes';

// Contracts
import { ContractsRepository } from '../../adapters/repositories/contracts';

export default {
  // Files
  addTestRoutes,
  TestControllers,
  // Contracts
  ContractsRepository,
};
