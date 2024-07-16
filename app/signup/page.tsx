"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

type Props = {};

const Signup = (props: Props) => {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);

  // Function to handle toggle change
  const handleToggleChange = () => {
    setIsYearly(!isYearly);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="m-4 min-h-[50vh] w-full max-w-sm rounded-lg lg:max-w-4xl">
        {/* logo */}
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <div className="flex items-center justify-center gap-2 p-1">
            <Image src="/beer.png" alt="Beer" width={20} height={20} />
            <h1 className="text-lg font-bold">Signup new account</h1>
          </div>
          {/* <span className="label-text">
            Full disclosure, you only need an account if you want to save your
            power hours so you can watch them again later.
          </span> */}
        </div>

        {/* /logo */}
        <main className="grid rounded-lg bg-base-100 lg:aspect-[2/1] lg:grid-cols-2">
          {/* image */}
          <div className="rounded-lg bg-base-300 object-cover max-lg:hidden">
            <div className="m-auto flex h-full w-full max-w-3xl flex-col justify-center">
              <div className="px-12 py-4">
                <h3 className="mb-1 flex items-center justify-between text-2xl font-medium">
                  {isYearly ? "Yearly Billing" : "Monthly Billing"}
                  <input
                    type="checkbox"
                    className="toggle toggle-md"
                    checked={isYearly}
                    onChange={handleToggleChange}
                  />
                </h3>
                <p className="text-zinc-300">
                  Save and rewatch your power hours
                </p>
                <p className="text-zinc-300">
                  Create power hours longer than 60 minutes
                </p>
                <p className="mt-8">
                  <span className="white text-5xl font-extrabold">
                    ${isYearly ? "50" : "5"}
                  </span>
                  <span className="text-base font-medium text-zinc-100">
                    {isYearly ? "/year" : "/month"}
                  </span>
                </p>
              </div>
              {/* {footer && ( */}
              <div className="w-full px-12 py-4">
                <button className="btn btn-neutral w-full">Confirm</button>
              </div>
            </div>
          </div>
          {/* /image */}
          <form className="flex flex-col justify-center gap-4 px-10 py-10 lg:px-16">
            {/* name */}
            <div className="form-control">
              <label className="label" htmlFor="input1">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success"
                pattern="^[a-zA-Z0-9_.-]*$"
                minLength={1}
                required
                id="input1"
              />
            </div>
            {/* /name */}
            {/* email */}
            <div className="form-control">
              <label className="label" htmlFor="input2">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success"
                required
                id="input2"
              />
            </div>
            {/* /email */}
            {/* password */}
            <div className="form-control">
              <label className="label" htmlFor="input3">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success"
                required
                minLength={8}
                id="input3"
              />
            </div>
            {/* /password */}
            {/* submit */}
            <button className="btn btn-neutral" type="submit">
              Login
            </button>
            {/* /submit */}
            {/* login with google */}
            <button type="button" className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                width="16"
                height="16"
              >
                <defs>
                  <path
                    id="A"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="B">
                  <use xlinkHref="#A" />
                </clipPath>
                <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                  <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
                  <path
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                    clipPath="url(#B)"
                    fill="#ea4335"
                  />
                  <path
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                    clipPath="url(#B)"
                    fill="#34a853"
                  />
                  <path
                    d="M48 48L17 24l-4-3 35-10z"
                    clipPath="url(#B)"
                    fill="#4285f4"
                  />
                </g>
              </svg>
              Login with Google
            </button>
            {/* /login with google */}
            {/* login link */}
            <div className="label justify-end">
              <a
                className="link-hover link label-text-alt"
                onClick={() => router.push("/login")}
              >
                Login to existing account
              </a>
            </div>
            {/* /login link */}
          </form>
        </main>
      </div>
    </div>
  );
};

export default Signup;
