export type If<B extends boolean, T, E = never> = B extends true ? T : E;
