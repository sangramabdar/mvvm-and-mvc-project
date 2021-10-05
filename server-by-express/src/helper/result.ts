export interface ResultType<T> {
  error: null | string;
  value: T | null;
}

export default function Result<T>(
  e: string | null = null,
  value: T | null = null,
): ResultType<T> {
  if (e) {
    return {
      error: e,
      value: null,
    };
  }

  return {
    error: null,
    value: value,
  };
}
