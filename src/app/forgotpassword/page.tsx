"use client";

import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onForgotPassword() {
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      setMessage(response.data.message || "Email sent successfully.");
    } catch (error : any) {
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen py-2">
      <h1 className="text-4xl mb-20">Forgot Password</h1>

      <div>
        <label htmlFor="email" className="mr-8 text-2xl text-white">
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="john.doe@email.com"
          className="p-2 border border-gray-300 rounded-md mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        className="p-2 mt-5 border border-gray-300 rounded-md cursor-pointer"
        onClick={onForgotPassword}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Email Link to Reset Password"}
      </button>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
