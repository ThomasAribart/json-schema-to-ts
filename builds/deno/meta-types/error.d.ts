import { Get } from "../utils/index.d.ts";
export declare type ErrorType = "error";
export declare type Error<M = "Unknown error"> = {
    type: ErrorType;
    message: M;
};
export declare type Message<E> = Get<E, "message">;
