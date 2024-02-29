export type ArrayItemType<T> = T extends (infer Item)[] ? Item : T;
