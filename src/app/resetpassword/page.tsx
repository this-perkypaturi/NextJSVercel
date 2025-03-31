"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function onSubmit() {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/api/users/resetpassword", {
        password,
        token,
      });
      console.log("Password reset successfully", response.data);
      router.push("/login");
    } catch (error : any) {
      console.error("Error in resetting password", error.message);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-20">Reset Password</h1>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex flex-row">
          <label htmlFor="password" className="mr-2 text-2xl text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your new password"
            className="p-2 border border-gray-300 rounded-md mb-4"
            onChange={(e) => setPassword(e.target.value)}
            aria-label="New password"
          />
        </div>
        <div className="flex flex-row">
          <label htmlFor="confirmPassword" className="mr-2 text-2xl text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your new password"
            className="p-2 border border-gray-300 rounded-md mb-4"
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Confirm new password"
          />
        </div>
        <button
          type="submit"
          className="p-2 border border-gray-300 rounded-md mb-4 w-1/2 self-center mt-5 cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
