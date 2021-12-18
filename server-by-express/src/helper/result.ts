export interface ResultType<T> {
  result: T | null;
  error: null | string;
}

export default function Result<T>(
  value: T | null = null,
  e: string | null = null
): ResultType<T> {
  if (e) {
    return {
      result: null,
      error: e,
    };
  }

  return {
    result: value,
    error: e,
  };
}
