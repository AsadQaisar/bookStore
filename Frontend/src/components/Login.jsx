import React from "react";
import { useForm } from "react-hook-form";
import login from "/login.svg";
import Signup from "./Signup"; 
import axios from "axios";
import toast from "react-hot-toast";

function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to open the signup modal
  const openSignupModal = () => {
    document.getElementById("my_modal_3").close(); 
    document.getElementById("signup_modal").showModal(); 
  };

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Logged in Successfully");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-3xl p-0 border-2 border-[#34393f] shadow-xl">
          <div className="flex h-full">
            {/* Left side with image */}
            <div className="w-1/3 flex items-center justify-center p-4">
              <img
                src={login}
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
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  ✕
                </button>

                <h4 className="font-bold text-lg mb-4 text-center">Login</h4>
                <hr className="h-px mb-4 bg-gray-200 border-0 dark:bg-gray-600"/> 
                <div className="text-sm">
                  {/* Email */}
                  <div className="mt-4 space-y-2">
                    <span>Email</span>
                    <br />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-3 border rounded-md outline-none border-[#323940] bg-[#0f1215]"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-sm text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/* Password */}
                  <div className="mt-4 space-y-2">
                    <span>Password</span>
                    <br />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-3 py-3 border rounded-md outline-none border-[#323940] bg-[#0f1215]"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-sm text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>

                  {/* Button */}
                  <div className="flex justify-around mt-6">
                    <button
                      type="submit"
                      className="bg-pink-500 text-black rounded-md px-3 py-2 hover:bg-pink-700 duration-200"
                    >
                      Login
                    </button>
                    <p className="flex items-center">
                      <span className="mr-2">Not Registered?</span>
                      <button
                        type="button"
                        className="underline text-blue-500 cursor-pointer"
                        onClick={openSignupModal} // Use the function to open the signup modal
                      >
                        Signup
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      <Signup />
    </div>
  );
}

export default Login;
