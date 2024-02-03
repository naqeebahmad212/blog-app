"use client";
import { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

const SignInPageComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const handelSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      // callbackUrl:"/"
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      const error = JSON.parse(res.error);
      console.log(error);
      setErr(error.error);
      setLoading(false);
    }
    if (res?.ok) {
      window.location.replace("/admin/dashboard");
    }
  };
  return (
    <div className="w-full h-screen bg-gray-100 bg-dotted-pattern pt-12 ">
      <div className="bg-white shadow-md border m-auto border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <form onSubmit={handelSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="flex items-start">
              {/* <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="text-sm ml-3">
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div> */}
              <a
                href="#"
                className="text-sm my-3 text-blue-700 hover:underline ml-auto dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>

            <p className="text-warning mb-2 text-xs">{err}</p>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <div className="flex items-center ">
                <span className="mx-auto">Login</span>
                {loading && (
                  <span className="loading loading-sm loading-spinner ml-2"></span>
                )}
              </div>
            </button>
          </form>
          <div>
            <div className="h-[1px] my-3 w-full bg-gray-300 relative">
              {" "}
              <p className="absolute -top-3 left-[47%] bg-white px-2">or</p>
            </div>
            <button
              className="w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={async () => {
                await signIn("google", { callbackUrl: "/admin/dashboard" });
              }}
            >
              <GoogleIcon fontSize="small" className="mr-2" />
              Google
            </button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              href={"/register"}
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* <p className="mt-5">
        This card component is part of a larger, open-source library of Tailwind
        CSS components. Learn more by going to the official{" "}
        <a className="text-blue-600 hover:underline" href="#" target="_blank">
          Flowbite Documentation
        </a>
        .
      </p> */}
    </div>
  );
};

export default SignInPageComp;
