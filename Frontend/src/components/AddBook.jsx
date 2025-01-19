import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import addbook from "/addbook.svg";
import { useAuth } from "../context/AuthProvider";


function AddBook({editingBook}) {
  const { register, handleSubmit, reset } = useForm();
  const [authUser, setAuthUser] = useAuth();

  useEffect(() => {
    if (editingBook) {
      // Prefill form fields with the book data
      reset({
        name: editingBook.name,
        category: editingBook.category,
        title: editingBook.title,
        price: editingBook.price,
        image: editingBook.image
      });
    }
  }, [editingBook, reset]);

  const onSubmit = async (data) => {
    try {
      if (editingBook) {
        // Update book
        data.userId = authUser._id
        const response = await axios.put(`http://localhost:4001/book/${editingBook._id}`, data);
         // Handle successful response
         if (response.status === 200) {
          toast.success(response.data.message); // Show success message
          reset(); // Reset form fields
          document.getElementById("add_book_modal").close(); // Close the modal
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        // Add new book
        data.userId = authUser._id
        const response = await axios.post("http://localhost:4001/book/add", data);
        // Handle successful response
        if (response.status === 201) {
          toast.success(response.data.message); // Show success message
          reset(); // Reset form fields
          document.getElementById("add_book_modal").close(); // Close the modal
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
      document.getElementById("add_book_modal").close();
    } catch (error) {
      toast.error("Error adding book: " + error.response?.data?.message || error.message);
      console.error("Error:", error);
    }
  };

  // Function to close the modal without resetting the selected book
  const handleCloseModal = () => {
    document.getElementById("add_book_modal").close();
    reset();
  };

  return (
    <div>
      <dialog id="add_book_modal" className="modal">
        <div className="modal-box max-w-4xl p-0 border-2 border-[#34393f] shadow-xl">
          <div className="flex h-full">
            {/* Left side with image */}
            <div className="w-1/3 flex items-center justify-center p-4">
              <img
                src={addbook} // Replace with the correct image path
                alt="Login Illustration"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>

            {/* Right side with form */}
            <div className="w-2/3 p-8 flex flex-col justify-center">
              <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={handleCloseModal}
                >
                    ✕
                </button>

                <h4 className="font-bold text-lg mb-4 text-center">
                  {editingBook ? "Edit Book" : "Add Book"}
                </h4>
                <hr className="h-px mb-4 bg-gray-200 border-0 dark:bg-gray-600"/> 
                <div className="text-sm space-y-4">
                    {/* Title and Genre */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <label className="flex">Title</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="w-full px-3 py-3 border rounded-md outline-none border-[#323940] bg-[#0f1215]"
                            {...register("name", { required: true })}
                        />
                        </div>

                        <div className="space-y-2">
                        <label className="flex">Genre</label>
                        <input
                            type="text"
                            placeholder="Enter Genre"
                            className="w-full px-3 py-3 border rounded-md outline-none border-[#323940] bg-[#0f1215]"
                            {...register("category", { required: true })}
                        />
                        </div>
                    </div>

                    {/* Description and Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <label className="flex">Description</label>
                        <input
                            type="text"
                            placeholder="Define Description"
                            className="w-full px-3 py-3 border rounded-md outline-none border-[#323940] bg-[#0f1215]"
                            {...register("title", { required: true })}
                        />
                        </div>

                        <div className="space-y-2">
                        <label className="flex">Price</label>
                        <input
                            type="text"
                            placeholder="Enter Price"
                            className="w-full px-3 py-3 border rounded-md outline-none border-[#323940] bg-[#0f1215]"
                            {...register("price", {
                              required: false,
                              setValueAs: (value) => (value === "" ? null : Number(value)), // Set null if empty, else convert to number
                            })}
                        />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="space-y-2">
                        <label className="flex">Image Link</label>
                        <input
                        type="text"
                        placeholder="Upload Image"
                        className="w-full px-3 py-3 border rounded-md outline-none border-[#323940] bg-[#0f1215]"
                        {...register("image", { required: true })}
                        />
                    </div>

                    {/* Button */}
                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        className="bg-pink-500 text-black rounded-md px-3 py-3 hover:bg-pink-700 duration-200l"
                      >
                        {editingBook ? "Update Book" : "Add Book"}
                      </button>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AddBook;
