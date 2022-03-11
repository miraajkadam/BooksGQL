import { FC, FormEventHandler, PropsWithChildren } from "react";
import { DataProps, graphql } from "react-apollo";
import { AuthorType } from "../index.d";
import { getAuthorsQuery } from "../queries/queries";

interface Props extends PropsWithChildren<Partial<DataProps<{}, {}>>> {}

const AddBook: FC<Props> = (props) => {
  const fetchAuthors = () => {
    if ((props as any).data.loading) return <option disabled>Loading Authors...!</option>;
    else {
      return (props.data as any).authors.map((author: AuthorType) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let data = {};

    for (let [key, value] of formData.entries()) {
      data = { ...data, [key]: value };
    }
    console.log(data);
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

export default graphql(getAuthorsQuery)(AddBook);
