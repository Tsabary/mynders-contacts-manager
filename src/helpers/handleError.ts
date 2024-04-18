export function handleError(err: unknown, base: string, rethrow?: boolean) {
  let message = base;
  if (err instanceof Error) {
    message += err.message;
  }
  if (rethrow) {
    throw new Error(message);
  } else {
    console.error(message);
  }
}
