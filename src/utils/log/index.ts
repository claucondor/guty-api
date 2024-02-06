import { Logger, ILogObj } from 'tslog';

const logger: Logger<ILogObj> = new Logger();

type Log = {
  layer: string;
  module: string;
  function: string;
  data: any;
};

export { Log, logger };
