import { model, Schema } from 'mongoose';

const authorSchema = new Schema({
  name: { type: String },
  age: { type: Number },
});

const Author = model('Author', authorSchema);

export default Author;
