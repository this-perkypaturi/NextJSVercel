"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [logging, setLogging] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  async function onLogin() {
    try {
      setLogging(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login details of the user : ", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Error in logging", error.message);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLogging(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-20">
          {logging ? "Processing..." : "Login"}
        </h1>

        <div className="flex flex-row items-center justify-center mb-5">
          <label htmlFor="email" className="mr-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            placeholder="jon.doe@email.com"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border border-solid border-white p-4 rounded-md bg-zinc-800 placeholder:text-gray-400"
          />
        </div>

        <div className="flex flex-row items-center justify-center">
          <label htmlFor="password" className="mr-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            placeholder="Enter Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="border border-solid border-white p-4 rounded-md bg-zinc-800 placeholder:text-gray-400"
          />
        </div>

        <button
          className={`mt-10 bg-zinc-800 text-white p-4 rounded-md hover:bg-zinc-600 cursor-pointer ${
            buttonDisabled || logging ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={onLogin}
          disabled={buttonDisabled || logging}
        >
          {logging ? "Logging in..." : "Login"}
        </button>

        <Link
          href="/signup"
          className="mt-10 border border-solid border-white p-4 rounded-md"
        >
          Go to Signup page
        </Link>
      </div>
    </>
  );
}
