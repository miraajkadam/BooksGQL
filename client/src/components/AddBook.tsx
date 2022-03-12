import { useMutation, useQuery } from "@apollo/client";
import { FormEventHandler } from "react";
import { AuthorType, BookType } from "../index.d";
import { addBookMutation, getAuthorsQuery, getBooksQuery } from "../queries/queries";

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const fetchAuthors = () => {
    if (error) return <h3>Something went wrong..!</h3>;

    if (!loading) {
      const { authors } = data;
      return authors.map((author: AuthorType) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }

    return <>Loading...!</>;
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let bookData = {} as BookType;

    for (let [key, value] of formData.entries()) {
      bookData = { ...bookData, [key]: value };
    }

    const response = await addBook({ variables: bookData, refetchQueries: [{ query: getBooksQuery }] });
    console.log(response);
  };

  return (
    <form method="POST" onSubmit={handleFormSubmit}>
      <div className="field">
        <label htmlFor="name">Book Name: </label>
        <input type="text" name="name" />
      </div>

      <div className="field">
        <label htmlFor="genre">Genre: </label>
        <input type="text" name="genre" />
      </div>

      <div className="field">
        <label htmlFor="author">Author: </label>
        <select name="authorId">
          <option>Select Author</option>
          {fetchAuthors()}
        </select>
      </div>
      <input type="submit" value="+" />
    </form>
  );
};

export default AddBook;
