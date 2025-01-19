import React, { useState } from "react";
import Signup from "./Signup"; // Import the Signup component
import banner from "/Banner.svg";
import { useAuth } from "../context/AuthProvider"; // Import useAuth hook

function Banner() {
  const [email, setEmail] = useState(""); // State to manage email input
  const [emailError, setEmailError] = useState(false); // State to manage input validation
  const [authUser] = useAuth(); // Get authentication status

  // Function to handle Get Started click
  const handleGetStarted = () => {
    if (!email) {
      setEmailError(true); // Show error if email is empty
    } else {
      setEmailError(false); // Hide error if email is provided
      const signupModal = document.getElementById("signup_modal");
      signupModal.querySelector("input[name='email']").value = email;
      signupModal.showModal();
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-5">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            {!authUser ? (
              <>
              <h1 className="text-2xl md:text-4xl font-bold">
                  Hello, welcome here to learn something{" "}
                  <span className="text-pink-500">new everyday!!!</span>
              </h1>
              <p className="text-medium">
                  Explore a wide range of books from various genres. Whether you're a registered
                  user or just visiting, you can browse, buy, and enjoy the books available. 
                  Register to add your own books and connect with our community of readers!
              </p>
              <div className="space-y-2"> {/* Added space-y-4 for spacing between input and button */}
                <div className="flex justify-between">
                  <label
                      className={`input w-full input-bordered flex items-center gap-2 mx-2 border ${
                        emailError ? "border-2 border-red-800" : "border-[#383f47]"
                      } rounded-md px-2 py-1`}
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="email"
                      className={`grow ${emailError ? "border-red-500" : ""}`} // Show red border on error
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <button 
                    className="bg-pink-500 text-black font-semibold text-sm px-4 py-2 rounded-lg hover:bg-pink-600 duration-200 mx-2 whitespace-nowrap" 
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </button>
                </div>
                {emailError && (
                    <span className="text-red-500 text-sm block mx-2">
                      Please enter a valid email address.
                    </span>
                )}
              </div>
              </>
            ) : (
              // Content when the user is logged in
              <>
                <h1 className="text-2xl md:text-4xl font-bold">
                  Hello, Welcome back!{" "}
                  <br />
                  <span className="text-pink-500">{authUser.fullname}</span>
                  <br />
                  {" "}to{" "}
                  <span className="text-pink-500">book</span>
                  Store.
                </h1>
                <p className="text-medium">
                  As a registered user, you can add your own books for sale, manage your collection, and purchase books from other users. 
                  Explore new arrivals, find your next read, and enjoy our vibrant community of book lovers!
                </p>
              </>
            )}  
          </div>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[470px] md:h-[385px] md:ml-12"
            alt=""
          />
        </div>
      </div>
      <Signup />
    </>
  );
}

export default Banner;
