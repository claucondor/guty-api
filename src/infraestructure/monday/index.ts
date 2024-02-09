import { MONDAY_API_KEY } from '../env';
import { MondayClient } from './client';

export function connectToMonday(): MondayClient {
  return new MondayClient(MONDAY_API_KEY as string);
}
