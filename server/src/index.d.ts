export type ArgsType<T> = T;

export type Combined<T, D> = T & D;

export type Author = {
  id: string;
  name: string;
  age: number;
};

export type Book = {
  id: string;
  name: string;
  genre: string;
  authorId: string | number;
};
