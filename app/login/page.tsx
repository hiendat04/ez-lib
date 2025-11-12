"use client";
import Link from "next/link";
import LoginLayout from "./layout";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useState } from "react";
import InputField from "@/components/form/InputField";

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
      <div className="w-full max-w-md rounded-lg bg-white px-20 py-15 shadow-md">
        <div className="space-y-2 text-center">
          <LocalLibraryIcon
            className="text-primary mb-7"
            sx={{ fontSize: "60px" }}
          />
          <p className="text-xl">EzLib</p>
          <p className="text-primary-light">Sign in To Your Account</p>
        </div>
        <form className="mt-10" onSubmit={handleSubmit}>
          <InputField
            label="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />
          <InputField
            label="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 mt-5 w-full rounded-md px-4 py-2 font-medium text-white transition-colors hover:cursor-pointer"
          >
            Sign in
          </button>
        </form>
        <p className="text-primary-light mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </LoginLayout>
  );
};
export default LoginPage;
