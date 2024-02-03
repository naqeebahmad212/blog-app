"use client";
import { registerUser } from "@/lib/db/action";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React, { FormEventHandler, useState, useTransition } from "react";
import GoogleIcon from "@mui/icons-material/Google";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confPassowrd, setConfPassowrd] = useState("");
  const [err, setErr] = useState("");

  const [isPending, startTransition] = useTransition();

  const registerHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setErr('')
    if (password !== confPassowrd) {
      return setErr("Confirm password does not match");
    }
    const data = { name, email, password };

    startTransition(async () => {
     const res= await registerUser({ data: data });
     setErr(res as string)
    });
  };
  return (
    <div>
      {" "}
      <div className="bg-gray-100 bg-dotted-pattern py-12 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-md shadow-md  lg:w-1/3 md:6/12 w-10/12">
          {/* <div className=" bg-blue-700 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </div> */}
          <div className="p-10 md:p-18 relative">
          <h2 className="mb-4 text-center text-2xl">Registeration</h2>

            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="20" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
              <input
                required
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border focus:outline-none pl-12 py-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Name"
              />
            </div>
            <form onSubmit={registerHandler}>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="20">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                </svg>
                <input
                  required
                  type="email"
                  id="email"
                  className="bg-gray-50 border focus:outline-none pl-12 py-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="20">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>
                <input
                  required
                  type="password"
                  id="password"
                  className="bg-gray-50 border focus:outline-none pl-12 py-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassowrd(e.target.value)}
                />
              </div>
              <div className="flex items-center text-lg mb-3 md:mb-4">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="20">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>
                <input
                  required
                  type="password"
                  id="confPassword"
                  className="bg-gray-50 border focus:outline-none pl-12 py-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Confirm Password"
                  value={confPassowrd}
                  onChange={(e) => setConfPassowrd(e.target.value)}
                />
              </div>
              <p className="err-mesg text-warning text-xs p-2 m-0">{err}</p>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <div className="flex items-center ">
                <span className="mx-auto">Register</span>
                {isPending && (
                  <span className="loading loading-sm loading-spinner ml-2"></span>
                )}
                </div>
              </button>
            </form>
            <div>
              <div className="h-[1px] w-full my-5 bg-gray-300 relative">
                {" "}
                <p className="absolute -top-3 left-[47%] bg-white px-2">or</p>
              </div>
              <button
                className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={async () => {
                  await signIn("google", { callbackUrl: "/" });
                }}
              >
                <GoogleIcon fontSize="small" className="mr-2" />
                Google
              </button>
            </div>
            <div className="text-sm mt-3 font-medium text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <Link 
              href={'/auth/signin'}
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
