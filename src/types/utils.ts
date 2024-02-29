export type ArrayItemType<T> = T extends (infer Item)[] ? Item : T;

export type ArgsType<T> = T extends (...args: infer Args) => any ? Args : never;
