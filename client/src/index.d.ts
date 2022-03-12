export type GetTypeOfKey<T, K extends keyof T> = {
  K: typeof K;
};

export type BookType = {
  name: string;
  genre: string;
  id: string;
  authorId: string;
};

export type AuthorType = {
  name: string;
  id: string;
};
