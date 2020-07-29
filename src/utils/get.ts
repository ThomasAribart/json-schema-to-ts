export type Get<O, P extends string> = P extends keyof O ? O[P] : never;
