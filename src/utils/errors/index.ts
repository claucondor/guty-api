function getMessageFromError(err: any): string {
  return err instanceof Error ? err.message : 'unknown error';
}

export { getMessageFromError };
