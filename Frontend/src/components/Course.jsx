import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from "./Table";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import AddBook from "./AddBook"; // Import the AddBook component

function Course() {
  const [authUser] = useAuth(); // Ensure authUser is properly initialized
  const [book, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for modal visibility
  const [editingBook, setEditingBook] = useState(null); // State to manage which book is being edited

  useEffect(() => {
    const getBook = async () => {
      try {
        const resBooks = await axios.get("http://localhost:4001/book");
        const resUsers = await axios.get("http://localhost:4001/user");
  
        const books = resBooks.data;
        const users = resUsers.data;
  
        const mergedBooks = books.map((book) => {
          const user = users.find((user) => user._id === book.userId);
          
          return {
            ...book,
            addedBy: user ? user.fullname : "Unknown", 
            contact: user ? user.email : "Unknown", 
          };
        });
  
        setBooks(mergedBooks);
      } catch (error) {
        console.log("Error fetching books and users:", error);
      }
    };
  
    getBook();
  }, []);
  


  // Function to handle editing of a book
  const handleEditBook = (book) => {
    setEditingBook(book); // Set the selected book to be edited
    document.getElementById("add_book_modal").showModal(); // Show the edit modal
  };

  // Function to handle book deletion
  const handleDeleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`http://localhost:4001/book/delete/${bookId}`);
      //setBooks(books.filter((book) => book._id !== bookId)); // Remove the book from state
      if (response.status === 200) {
        toast.success(response.data.message); // Show success message
        setShowDeleteModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="pt-28 items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          Welcome to our <span className="text-pink-500">Bookstore</span>
        </h1>
        <p className="mt-5 mb-10">
          Discover, add, and buy books from our collection. Share your favorite
          reads or explore a variety of genres. Whether you're looking to expand
          your library or offer your own books for sale, you've come to the
          right place!
        </p>
      </div>
      
      <div className="card w-92 bg-base-100 shadow-xl dark:bg-slate-800 mb-8">
        <div className="px-5 py-5">
          {/* Table Component */}
          <div className="flex justify-between mb-4">
            <p className="flex items-center text-2xl font-bold">Courses</p>
            {authUser && (
            <>
              <button
                className="bg-pink-500 text-black font-medium text-sm px-4 py-3 rounded-lg hover:bg-pink-600 duration-200 whitespace-nowrap"
                onClick={() => document.getElementById("add_book_modal").showModal()}
              >
                Add Book
              </button>
            </>
            )}
          </div>
          <AddBook 
            editingBook={editingBook}
          />
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-600"/>
          <Table 
            courses={book} 
            onEditBook={handleEditBook}
            onDeleteBook={handleDeleteBook}
          /> {/* Display Table Component */}
        </div>
      </div>

    </div>
  );
}

export default Course;
