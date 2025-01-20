"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface SignupProps {
  heading: string;
  component: string;
}

const Auth = ({ heading, component }: SignupProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("From Data", formData);
    const response: any = await axios.post(
      component == "signup"
        ? "http://localhost:3100/api/v1/user/signup"
        : "http://localhost:3100/api/v1/user/signin",
      formData,
    );
    console.log(response);
    localStorage.setItem("token", response.data.user.jwtToken);
    router.push("/room");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto flex items-center justify-center md:justify-normal px-2">
      <div className="flex flex-coll gap-12 py-3">
        <div className="text-2xl font-semibold cursor-pointer hidden md:flex">
          automibiles
        </div>
        <div className="bg-white rounded-md py-4 shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-md md:text-xl font-semibold cursor-pointer py-3 pb-6">
              {heading}
            </h1>
            <div className="bg-gray-400 border-b w-full my-4"></div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="px-16 w-full flex flex-col items-center ">
                {component == "signup" ? (
                  <input
                    onChange={handleChange}
                    type="text"
                    id="name"
                    name={"name"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg block p-2 mt-4 w-full"
                    placeholder="Enter Userid or Name"
                    required
                  />
                ) : (
                  ""
                )}
                <input
                  onChange={handleChange}
                  type="text"
                  id="email"
                  name={"email"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg block p-2 mt-4 w-full"
                  placeholder="Enter Userid or Email"
                  required
                />
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name={"password"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg block p-2 mt-4 w-full"
                  placeholder="Enter your password"
                  required
                />

                <button
                  // need to fixes

                  // onClick={handleSubmit}
                  className="flex items-center text-gray-600 justify-center bg-gray-600 rounded-md w-full py-1 mt-4 bg-gradient-to-tr from-purple-300 via-pink-200 to-green-300 hover:bg-gradient-to-tr hover:from-purple-200 hover:via-pink-200 hover:to-green-200"
                >
                  Sign In
                </button>

                <div className="flex items-center justify-center gap-3 mt-4 w-full">
                  <div className="bg-gray-400 border-b-[1px] w-full my-4"></div>
                  <span className="text-gray-400 text-sm ">OR</span>
                  <div className="bg-gray-400 border-b-[1px] w-full my-4"></div>
                </div>

                <button className="w-full px-4 mt-4 py-1 border flex items-center justify-center border-slate-300 gap-2 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition-all duration-500">
                  <Image
                    height={20}
                    width={20}
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span className="text-gray-500 text-sm py-1 font-normal">
                    Login with Google
                  </span>
                </button>
              </div>
            </form>
            <Link
              className="text-gray-500 font-semibold"
              href={component == "signup" ? "/signin" : "signup"}
            >
              <h1 className="text-gray-500 text-sm py-4 font-normal">
                {component == "signup"
                  ? "Log in to your account"
                  : "Don't have an account"}{" "}
                <span className="underline cursor-pointer pl-1 border-gray-600">
                  {component == "signup" ? "Sign in" : "Sign up"}
                </span>
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;