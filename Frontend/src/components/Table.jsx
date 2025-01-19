import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

function Table({ courses, onEditBook, onDeleteBook }) {
  const [authUser] = useAuth(); 
  const [selectedBook, setSelectedBook] = useState(null); 

  // Function to open the modal after setting the selected book
  const handleDeleteClick = (course) => {
    setSelectedBook(course); 
  };

  // Function to close the modal without resetting the selected book
  const handleCloseModal = () => {
    document.getElementById("delete_confirmation_modal").close();
    setSelectedBook(null); 
  };

  // Show the modal when selectedBook changes
  useEffect(() => {
    if (selectedBook) {
      document.getElementById("delete_confirmation_modal").showModal();
    }
  }, [selectedBook]);

  return (
    <div className="overflow-x-auto mt-4 rounded-lg">
      <table className="table-auto w-full border-collapse border border-gray-200 dark:border-slate-700">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100 dark:bg-slate-700">
            <th className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-left text-slate-200">Course Name</th>
            <th className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-left text-slate-200">Genre</th>
            <th className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-left text-slate-200">Author</th>
            <th className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-left text-slate-200">Price</th>
            <th className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-left text-slate-200">Added By</th>
            <th className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-left text-slate-200">Action</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id} className="hover:bg-gray-100 dark:hover:bg-slate-800">
              <td className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-sm">{course.name}</td>
              <td className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-sm">
                <div className="inline-block bg-pink-500 text-black px-2.5 py-0.5 rounded">
                  {course.category}
                </div>
              </td>
              <td className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-sm">{course.title}</td>
              <td className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-sm">${course.price}</td>
              <td className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-sm">
                {authUser && course.addedBy === authUser.fullname ? (
                  "You"
                ) : (
                  <span className="relative group cursor-pointer">
                    {course.addedBy}
                    <span className="absolute left-0 top-full mt-1 p-2 bg-gray-700 text-white text-xs rounded shadow-md hidden group-hover:block">
                      {course.contact} 
                    </span>
                  </span>
                )}
              </td>
              <td className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-sm">
                <div className="flex items-center space-x-2">
                {authUser ? (
                    authUser._id !== course.userId && (
                      <button 
                        className="bg-zinc-600 text-white px-3 py-1 rounded hover:bg-zinc-700 duration-200"
                        //onClick={() => handleBuyBook(course)}
                      >
                        Buy
                      </button>
                    )
                  ) : (
                    <button 
                      className="bg-zinc-600 text-white px-3 py-1 rounded hover:bg-zinc-700 duration-200"
                      //onClick={() => handleBuyBook(course)}
                    >
                      Buy
                    </button>
                  )}
                  {authUser && course.userId === authUser._id && (
                    <>
                      <button 
                        className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-slate-700 duration-200"
                        onClick={() => onEditBook(course)}
                      >
                        Edit
                      </button>
                      <button 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 duration-200"
                        onClick={() => handleDeleteClick(course)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* Delete Confirmation Modal */}
       { selectedBook && (
        <div>
          <dialog id="delete_confirmation_modal" className="modal">
            <div className="modal-box max-w-2xl p-0 border-2 border-[#34393f] shadow-xl">
              <div className="flex h-full">
                {/* Left side with image */}
                <div className="w-1/3 flex items-center justify-center p-4">
                  <img
                    src={selectedBook.image}
                    alt="Login Illustration"
                    className="w-full h-auto object-cover shadow-lg rounded-md"
                  />
                </div>

                {/* Right side with form */}
                <div className="w-2/3 p-8 flex flex-col justify-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={handleCloseModal}
                    >
                      ✕
                    </button>
                    <h4 className="font-bold text-lg mb-4 text-center">Are you wany to delete?</h4>
                    <hr className="h-px mb-4 bg-gray-200 border-0 dark:bg-gray-600"/> 
                    <hr className="bg-gray-200 border-0 dark:bg-gray-600"/> 
                    <div className="text-sm">                 
                      <dl className="mb-4">
                        <div className="flex mb-2">
                          <dt className="font-semibold w-1/3">Title:</dt>
                          <dd className="w-2/3">{selectedBook.name}</dd>
                        </div>
                        <div className="flex mb-2">
                          <dt className="font-semibold w-1/3">Author:</dt>
                          <dd className="w-2/3">{selectedBook.title}</dd>
                        </div>
                        <div className="flex mb-2">
                          <dt className="font-semibold w-1/3">Genre:</dt>
                          <dd className="w-2/3">{selectedBook.category}</dd>
                        </div>
                        <div className="flex mb-2">
                          <dt className="font-semibold w-1/3">Price:</dt>
                          <dd className="w-2/3">${selectedBook.price}</dd>
                        </div>
                      </dl>
                      {/* Button */}
                      <div className="flex justify-around mt-6">
                        <button
                          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 duration-200"
                          onClick={() => onDeleteBook(selectedBook._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </dialog>  
        </div>
       )}
    </div>
  );
}

export default Table;
