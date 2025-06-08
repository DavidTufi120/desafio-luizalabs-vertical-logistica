export const logger = {
  info: (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(message);
  },
  error: (message: string, error?: unknown): void => {
    // eslint-disable-next-line no-console
    console.error(message, error);
  },
}; 
