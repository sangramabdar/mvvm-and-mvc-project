type State = "success" | "failure";

export interface ResultType<T> {
  state: State;
  payload: T;
}

export default function Result<T>(state: State, payload: T): ResultType<T> {
  return {
    state,
    payload,
  };
}
