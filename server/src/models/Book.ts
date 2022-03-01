import { model, Schema } from 'mongoose';

const bookSchema = new Schema({
  name: { type: String },
  genre: { type: String },
  authorId: { type: String },
});

const Book = model('Book', bookSchema);

export default Book;
