import { Get } from "../utils";

export type ErrorType = "error";

export type Error<M = "Unknown error"> = {
  type: ErrorType;
  message: M;
};

export type Message<E> = Get<E, "message">;
