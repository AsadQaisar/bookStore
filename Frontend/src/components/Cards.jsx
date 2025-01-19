import React, { useState, useEffect } from "react";


function Cards({ item }) {
  const [selectedBook, setSelectedBook] = useState(null); 
  
  // Function to open the modal
  const handleClick = (item) => {
    setSelectedBook(item);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedBook(null); // Clear selected book when modal closes
  };

  // Show the modal when selectedBook changes
  useEffect(() => {
    if (selectedBook) {
      document.getElementById("information_modal").showModal();
    }
  }, [selectedBook]);

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div class="w-full max-w-sm hover:scale-105 duration-100 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="m-4">
              <img 
                className="rounded-lg shadow-xl cursor-pointer" 
                src={item.image} alt="product image" 
                onClick={() => handleClick(item)}  
              />
          </div>
          <div class="px-5 pb-5">
              <h5 
                className="text-xl tracking-tight text-gray-900 dark:text-white truncate"
                title={item.name} // Tooltip with the full name on hover
              >
                {item.name}
              </h5>
              <div class="flex items-center mt-2.5 mb-5">
              <span class="bg-pink-500 text-black text-sm me-2 px-2.5 py-0.5 rounded">{item.category}</span>
              </div>
              <div class="flex items-center justify-between">
                  <span class="text-xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                  <a href="#" class="bg-slate-600 text-slate-200 px-3 py-2 rounded hover:bg-slate-700 duration-2">Add to cart</a>
              </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      { selectedBook && (
        <div>
          <dialog id="information_modal" className="modal">
            <div className="modal-box max-w-2xl p-0 border-2 border-[#34393f] shadow-xl">
              <div className="flex h-full">
                {/* Left side with image */}
                <div className="w-1/3 flex items-center justify-center p-4">
                  <img
                    src={selectedBook.image}
                    alt="Login Illustration"
                    className="w-full h-auto object-cover shadow-xl rounded-md"
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
                    <h4 className="font-bold text-lg mb-4 text-center">Book Details</h4>
                    <hr className="h-px mb-4 bg-gray-200 border-0 dark:bg-gray-600"/> 
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
                        <div className="flex mb-2">
                          <dt className="font-semibold w-1/3">Added By:</dt>
                          <dd className="w-2/3 relative group">
                            <span className="cursor-pointer">{selectedBook.addedBy}</span>
                            <span className="absolute left-0 top-full mt-1 p-2 bg-gray-700 text-white text-xs rounded shadow-xl hidden group-hover:block">
                              {selectedBook.contact}
                            </span>
                          </dd>
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
                          className="bg-indigo-700 text-white px-3 py-2 rounded hover:bg-indigo-800 duration-2"
                          //onClick={() => onDeleteBook(selectedBook._id)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </dialog>  
        </div>
      )}
    </>
  );
}

export default Cards;
