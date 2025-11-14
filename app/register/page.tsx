"use client";
import Link from "next/link";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useState } from "react";
import LoginLayout from "../login/layout";
import PublicHeader from "@/components/landing/PublicHeader";
import Input from "@/components/form/Input";
import Loading from "@/components/Loading";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side validation
    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Optionally redirect to login page after success
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(
        `Network error occurred. Please try again. Error Details: ${error}`,
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <PublicHeader />
        <LoginLayout>
          <Loading text="Creating your account..." />
        </LoginLayout>
      </>
    );
  }

  if (success) {
    return (
      <>
        <PublicHeader />
        <LoginLayout>
          <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
            <LocalLibraryIcon
              className="mx-auto text-green-500"
              sx={{ fontSize: "60px" }}
            />
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              Account Created!
            </h2>
            <p className="mt-2 text-gray-600">Redirecting to login page...</p>
          </div>
        </LoginLayout>
      </>
    );
  }

  return (
    <>
      <PublicHeader />
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
            {error && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <Input
              label="Full Name"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={setFullName}
              required
            />
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
              required
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              required
            />
            <Input
              label="Confirm Password"
              id="confirm"
              type="password"
              placeholder="Confirm your password"
              value={confirm}
              onChange={setConfirm}
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 mt-5 w-full rounded-md px-4 py-2 font-medium text-white transition-colors"
            >
              Create Account
            </button>
          </form>
          <p className="text-primary-light mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </LoginLayout>
    </>
  );
};

export default RegisterPage;
