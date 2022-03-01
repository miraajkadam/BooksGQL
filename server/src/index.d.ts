export type ArgsType<T> = T;

export type Combined<T, D> = T & D;

export type Author = {
  name: string;
  age: number;
};

export type Book = {
  name: string;
  genre: string;
  authorId: string | number;
};
