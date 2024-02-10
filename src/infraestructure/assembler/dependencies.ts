// Test
import { ContractController } from '../../adapters/http/contracts/controller';
import { addContractsRoutes } from '../../adapters/http/contracts/routes';
import { TestControllers } from '../../adapters/http/test/controller';
import { addTestRoutes } from '../../adapters/http/test/routes';

// Contracts
import { ContractsRepository } from '../../adapters/repositories/contracts';
import { ContractsUseCases } from '../../use-cases/contracts';

export default {
  // Files
  addTestRoutes,
  TestControllers,
  // Contracts
  addContractsRoutes,
  ContractController,
  ContractsRepository,
  ContractsUseCases,
};
