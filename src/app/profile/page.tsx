"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Error in logging out", error.message);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data);
    setData(response.data.userData._id);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-20">Profile Page</h1>
      <hr />
      <p>Profile Page</p>
      <h2>
        {data === null ? (
          "User Data : User not found"
        ) : (
          <Link href={`/profile/${data}`} className="cursor-pointer">
            User Data : {data}. Click to view
          </Link>
        )}
      </h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={onLogout}
      >
        Logout
      </button>
      <button
        className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}
