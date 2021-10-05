export type ResultType<T = any> = {
  error: string | null;
  value: T | null;
};

export function ResultModifier(element: any) {
  const result = element as ResultType;

  if (result.error) {
    return Result(result.error, null);
  }
  return Result(null, result.value);
}

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
