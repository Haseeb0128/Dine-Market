"use client";

import { cartContext } from "@/global/context";
import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
};

const SignupComp = () => {
  let {
    signUpUser,
    signUpViaGoogle,
    loading,
    userData,
    sendEmailVarificationCode,
  } = useContext(cartContext);

  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (userData) {
      window.location.href = "/";
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    const { fullName, email, password } = formData;
    const validationErrors: { [key: string]: string } = {};

    // Check for required fields
    if (!fullName) {
      validationErrors.fullName = "Full Name is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password || password.length < 6) {
      validationErrors.password = "Password is required";
    }

    // Check for valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      validationErrors.email = "Invalid email address";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      signUpUser(formData.email, formData.password);
    }
  };
  function handleSignUpWithGoogle() {
    signUpViaGoogle();
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 lg:pt-12 lg:pb-12 pt-7 pb-7 sm:pt-0 sm:pb-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white"
        >
          Sign Up
        </a>
        <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="full-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Bonnie Green"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs italic mt-[2px]">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic mt-[2px]">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic mt-[2px]">
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                disabled={loading}
                type="button"
                onClick={handleSignUp}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? "Loading...." : "Sign Up"}
              </button>
              <button
                type="button"
                onClick={handleSignUpWithGoogle}
                className="flex gap-3 items-center justify-center w-full text-white bg-[#0F172A] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <FcGoogle size={25} />
                <p>Sign Up with Google</p>
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
              {userData && (
                <div className="flex justify-between items-center">
                  <p>Send Verification Email</p>
                  <button
                    onClick={sendEmailVarificationCode}
                    className="text-white bg-[#0F172A] p-2 rounded-lg"
                  >
                    Send
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupComp;
