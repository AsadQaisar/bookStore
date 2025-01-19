import React, { useState } from "react";
import { useForm } from "react-hook-form";
import contact from "/contact.svg";
import emailjs from '@emailjs/browser';
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Contact() {
  const [email, setEmail] = useState(""); // State to manage email input
  const [emailError, setEmailError] = useState(false); // State to manage input validation
  const [authUser] = useAuth(); // Get authentication status

  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();

  // Function to handle Get Started click
  const onSubmit = (data) => {
    if (authUser) {
      data.fullname = authUser.fullname;
      data.email = authUser.email;
    }
    // Email.js configuration
  const serviceID = 'service_6mb63xl';
  const templateID = 'template_2lcfi06';
  const publicKey = '7L7fYQ04Pt-iD8bRS';

  // Sending the email
  emailjs.send(serviceID, templateID, data, publicKey)
    .then((response) => {
      toast.success("Message Sent Successfully");
      reset();
    })
    .catch((error) => {
      console.log('FAILED...', error);
      // Show error message or toast notification
      toast.error("Error: " + (error || "Something went wrong"));
    });
  };

  return (
    <>
      <div className="pt-28 px-24 items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          Get In <span className="text-pink-500">Touch</span>
        </h1>
      </div>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-5 md:mb-10">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold">
              Contact Us Anytime. We're Here to{" "}
              <span className="text-pink-500">Help!</span> 
            </h1>
            <p>
              Have questions or need assistance? Drop us a message, and we will
              get back to you as soon as possible. Your feedback and queries are
              important to us.
            </p>
            <div className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                {!authUser && (
                  <div className="flex flex-col md:flex-row gap-4">
                  {/* Full Name Input */}
                  <div className="flex flex-col w-full">
                    <label
                      className={`input input-bordered flex items-center gap-2 ml-2 border ${
                        errors.fullname ? "border-2 border-red-800" : "border-[#383f47]"
                      } rounded-md px-2 py-1`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 opacity-70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        type="text"
                        className="grow w-full px-2 py-1 text-sm" // Full width input
                        placeholder="Full Name"
                        {...register("fullname", { required: "This field is required" })} // Updated error message
                      />
                    </label>
                    {errors.fullname && (
                      <span className="text-xs text-red-500 mt-2 mx-2">{errors.fullname.message}</span> // Error displayed below input
                    )}
                  </div>
                
                  {/* Email Input */}
                  <div className="flex flex-col w-full">
                    <label
                      className={`input input-bordered flex items-center gap-2 mr-2 border ${
                        errors.email ? "border-2 border-red-800" : "border-[#383f47]"
                      } rounded-md px-2 py-1`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-5 h-5 opacity-70"
                      >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input
                        type="email"
                        className="grow w-full px-2 py-1 text-sm" // Full width input
                        placeholder="Email"
                        {...register("email", { required: "This field is required" })} // Updated error message
                      />
                    </label>
                    {errors.email && (
                      <span className="text-xs text-red-500 mt-2 mx-2">{errors.email.message}</span> // Error displayed below input
                    )}
                  </div>
                </div>
                
                )}

                <div className="mx-2 my-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-[#383f47]">
                  <div className="px-4 py-2 bg-textbox-bg rounded-t-lg">
                    <label htmlFor="comment" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="comment"
                      rows="4"
                      className="w-full px-0 text-gray-900 bg-white border-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent dark:bg-textbox-bg text-sm dark:text-white dark:placeholder-gray-400"
                      placeholder="Write query / feedback..."
                      required
                      {...register("message", { required: "This field is required" })}
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-b-lg border-t border-t-slate-700 bg-slate-800">
                    <button
                      type="submit"
                      className="inline-flex items-center py-2.5 px-4 text-sm text-center text-black font-medium bg-pink-500 rounded-lg hover:bg-pink-600"
                    >
                      Get in Touch
                    </button>
                  </div>
                </div>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Remember, contributions to this topic should follow our{" "}
                <a href="#" className="text-pink-500 hover:underline">
                  Community Guidelines
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="order-1 w-full mt-6 md:w-1/2">
          <img
            src={contact}
            className="md:w-[470px] md:h-[385px] md:ml-14"
            alt="Contact Illustration"
          />
        </div>
      </div>
    </>
  );
}

export default Contact;
