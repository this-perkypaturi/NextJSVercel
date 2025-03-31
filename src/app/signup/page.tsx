"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  async function onSignup() {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup details of the user : ", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.log("Error in signing up", error.message);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-20">Signup Page</h1>
        <div className="flex flex-row items-center justify-center mb-5">
          <label htmlFor="username" className="mr-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="johnDoe"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="border border-solid border-white p-4 rounded-md bg-zinc-800 placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-row items-center justify-center mb-5">
          <label htmlFor="email" className="mr-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="john.doe@email.com"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border border-solid border-white p-4 rounded-md bg-zinc-800 placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-row items-center justify-center ">
          <label htmlFor="password" className="mr-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border border-solid border-white p-4 rounded-md bg-zinc-800 placeholder:text-gray-400"
          />
        </div>
        <button
          className="mt-10 bg-zinc-800 text-white p-4 rounded-md hover:bg-zinc-600 cursor-pointer"
          onClick={onSignup}
        >
          Signup
        </button>
        <Link
          href="/login"
          className="mt-10 border border-solid border-white p-4 rounded-md"
        >
          Go to Login page
        </Link>
      </div>
    </>
  );
}
