import Book from "../model/book.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

// Get a book by ID
export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error fetching book: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Add a new book
export const addBook = async (req, res) => {
    const { name, price, category, image, title, userId } = req.body;

    try {
        // Check if price is explicitly null or undefined, then set it to 0
        const processedPrice = price === null || price === undefined ? 0 : price;
        const newBook = new Book({
            name,
            price: processedPrice,
            category,
            image,
            title,
            userId
        });

        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        console.error("Error adding book: ", error);
        res.status(400).json({ message: "Bad request" });
    }
};

// Update an existing book
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { name, price, category, image, title, userId } = req.body;

    try {
        const processedPrice = price === null || price === undefined ? 0 : price;
        const updatedBook = await Book.findByIdAndUpdate(id, {
            name,
            price: processedPrice,
            category,
            image,
            title,
            userId
        }, { new: true }); // Return the updated document
        if (updatedBook) {
            res.status(200).json({ message: 'Book updated successfully', book: updatedBook});
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error updating book: ", error);
        res.status(400).json({ message: "Bad request" });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (deletedBook) {
            res.status(200).json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error deleting book: ", error);
        res.status(500).json({ message: "Server error" });
    }
};