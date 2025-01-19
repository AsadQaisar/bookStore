import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import signup from "/signup.svg";
import axios from "axios";
import toast from "react-hot-toast";

function Signup({ closeModal }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to switch back to the login modal
  const openLoginModal = () => {
    document.getElementById("signup_modal").close(); // Close the signup modal
    document.getElementById("my_modal_3").showModal(); // Show the login modal
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    console.log(data);
    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      console.log(data);
      
      if (res.data) {
        toast.success("Signup Successfully");
        navigate(from, { replace: true });
        openLoginModal();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error: " + (err.response?.data.message || "Signup failed"));
    }
  };

  return (
    <div>
      <dialog id="signup_modal" className="modal">
        <div className="modal-box max-w-4xl p-0 border-2 border-[#34393f] shadow-xl">
          <div className="flex h-full">
            {/* Left side with image */}
            <div className="w-1/3 flex items-center justify-center p-4">
              <img
                src={signup}
                alt="Signup Illustration"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>

            {/* Right side with form */}
            <div className="w-2/3 p-10 flex flex-col justify-center">
              <form onSubmit={handleSubmit(onSubmit)}> 
                <button
                  type="button"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => document.getElementById("signup_modal").close()}
                >
                  ✕
                </button>

                <h4 className="font-bold text-lg mb-4 text-center">Signup</h4>
                <hr className="h-px mb-4 bg-gray-200 border-0 dark:bg-gray-600"/> 
                <div className="text-sm">
                  <div className="flex justify-between space-x-4">
                    {/* Full Name */}
                    <div className="mt-4 space-y-2 w-1/2">
                      <span>Name</span>
                      <br />
                      <input
                        type="text"
                        placeholder="Enter fullname"
                        className="w-full px-3 py-3 border rounded-md outline-none border-[#323940] bg-[#0f1215]"
                        {...register("fullname", { required: true })}
                      />
                      {errors.fullname && (
                        <span className="text-sm text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    {/* Email */}
                    <div className="mt-4 space-y-2 w-1/2">
                      <span>Email</span>
                      <br />
                      <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full px-3 py-3 border rounded-md outline-none border-[#323940] bg-[#0f1215]"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <span className="text-sm text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Password */}
                  <div className="mt-4 space-y-2">
                    <span>Password</span>
                    <br />
                    <input
                      type="password"
                      placeholder="Enter password"
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
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit" 
                      className="bg-pink-500 text-black rounded-md px-3 py-2 hover:bg-pink-700 duration-200"
                    >
                      Signup
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

export default Signup;
