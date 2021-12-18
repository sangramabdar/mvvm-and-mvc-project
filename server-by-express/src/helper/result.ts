type ResultState = "success" | "failure";

export interface ResultType<T> {
  state: ResultState;
  payload: T;
}

export default function Result<T>(
  state: ResultState,
  payload: T
): ResultType<T> {
  return {
    state,
    payload,
  };
}
