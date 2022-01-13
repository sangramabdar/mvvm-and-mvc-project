export type ResultType<T = any> = {
  error: string | null;
  value: T | null;
};

export function Result<T>(error?: string, value?: T): ResultType<T> {
  if (error) {
    return {
      error,
      value: null,
    };
  }
  return {
    error: null,
    value,
  };
}
