import mongoose from "mongoose";

// Define the Book schema
const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, default: null },  // Make price optional and default to null
    category: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    userId: {type: String, required: true}
});
  
// Create a Mongoose model
const Book = mongoose.model("Book", bookSchema);
export default Book;