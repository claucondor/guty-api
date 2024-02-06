import { errors } from '../../../utils/consts/errors';
import { getMessageFromError } from '../../../utils/errors';

type HttpError = {
  status: number;
  message: string;
};

const errorCodes = new Map<string, number>([
  [errors.BAD_REQUEST, 400],
  [errors.UNAUTHORIZED, 401],
  [errors.CONFLICT, 409],
  [errors.NOT_FOUND, 404],
  [errors.INTERNAL, 500],
]);

function getHttpStatusByError(err: any): number {
  if (err instanceof Error) {
    for (const [errorCode, httpStatus] of errorCodes) {
      if (err.message.includes(errorCode) && doesStartWithErrorCode(err.message, errorCode)) {
        return httpStatus;
      }
    }
  }

  return 500;
}

function doesStartWithErrorCode(errorMessage: string, errorCode: string): boolean {
  for (let i = 0; i < errorCode.length; i++) {
    if (errorMessage[i] !== errorCode[i]) return false;
  }
  return true;
}

function handleHttpError(err: any): HttpError {
  const status = getHttpStatusByError(err);
  const message = getMessageFromError(err);

  return {
    status,
    message,
  } as HttpError;
}

function isAnInternalError(httpStatus: number): boolean {
  return 500 <= httpStatus && httpStatus <= 599;
}

export { getHttpStatusByError, doesStartWithErrorCode, handleHttpError, isAnInternalError };
