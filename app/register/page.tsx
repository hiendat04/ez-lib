"use client";
import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useState } from "react";
import LoginLayout from "../login/layout";
import InputField from "@/components/form/InputField";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Create API to login
    if (password !== confirm) {
      setIsPasswordMatch(false);
      return;
    }
    console.log({ email, password, fullName, confirm });
  };
  return (
    <LoginLayout>
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="space-y-2 text-center">
          <LocalLibraryIcon
            className="text-primary mb-7"
            sx={{ fontSize: "60px" }}
          />
          <p className="text-xl">Create Account</p>
          <p className="text-primary-light">Join our library community</p>
        </div>
        <form className="mt-10" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={setFullName}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            className={!isPasswordMatch ? "border-red-500" : ""}
          />
          <InputField
            label="Confirm Password"
            id="confirm"
            type="password"
            placeholder="Confirm your password"
            value={confirm}
            onChange={setConfirm}
            className={!isPasswordMatch ? "border-red-500" : ""}
          />
          {!isPasswordMatch && confirm.length > 0 && (
            <p className="mt-1 text-sm font-medium text-red-500">
              Passwords do not match!.
            </p>
          )}
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 mt-5 w-full rounded-md px-4 py-2 font-medium text-white transition-colors hover:cursor-pointer"
          >
            Create Account
          </button>
        </form>
        <p className="text-primary-light mt-6 text-center">
          Already have an account?{" "}
          <Link href="/#" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </LoginLayout>
  );
};
export default RegisterPage;
