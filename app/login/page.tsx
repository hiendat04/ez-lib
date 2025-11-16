"use client";
import Link from "next/link";
import LoginLayout from "./layout";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useState } from "react";
import PublicHeader from "@/components/landing/PublicHeader";
import Input from "@/components/form/Input";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage or context
        login(data.user);
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(`Network error occurred. Please try again. Details: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <PublicHeader />
        <LoginLayout>
          <Loading text="Logging in ..." />
        </LoginLayout>
      </>
    );

  return (
    <>
      <PublicHeader />
      <LoginLayout>
        <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-md">
          <div className="space-y-2 text-center">
            <LocalLibraryIcon
              className="text-primary mb-7"
              sx={{ fontSize: "60px" }}
            />
            <p className="text-xl">EzLib</p>
            <p className="text-primary-light">Sign in To Your Account</p>
          </div>
          <form className="mt-10" onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <label htmlFor="email">Email</label>
            <Input
              label="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
            />
            <label htmlFor="password">Password</label>
            <Input
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
    </>
  );
};
export default LoginPage;
