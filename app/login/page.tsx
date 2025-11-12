"use client";
import Link from "next/link";
import LoginLayout from "./layout";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Create API to login
    console.log({ email, password });
  };
  return (
    <LoginLayout>
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="space-y-2 text-center">
          <LocalLibraryIcon className="text-primary mb-7" sx={{fontSize: '60px'}} />
          <p className="text-xl">EzLib</p>
          <p className="text-primary-light">Sign in To Your Account</p>
        </div>
        <form className="mt-10" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="focus:ring-primary mt-2 mb-4 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
            placeholder="Enter your email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="focus:ring-primary mt-2 mb-4 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
            placeholder="Enter your password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 font-medium text-white transition-colors hover:cursor-pointer mt-5"
          >
            Sign in
          </button>
        </form>
        <p className="text-primary-light mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/#" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </LoginLayout>
  );
};
export default LoginPage;
