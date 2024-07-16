"use client";

import Image from "next/image";

const ResetPassword = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="m-4 flex min-h-[50vh] w-full max-w-sm flex-col items-center lg:max-w-4xl">
        {/* logo */}
        <div className="flex items-center justify-center gap-2 p-8">
          <Image src="/beer.png" alt="Beer" width={20} height={20} />
          <h1 className="text-lg font-bold">Password recovery</h1>
        </div>
        {/* /logo */}
        <div className="max-w-[25rem] rounded-xl bg-base-100">
          {/* image */}
          {/* <figure className="pointer-events-none bg-base-300 object-cover max-lg:hidden">
            <Image
              src="https://picsum.photos/id/283/1200/1200"
              alt="Login"
              layout="fill"
              objectFit="cover"
            />
          </figure> */}
          {/* /image */}
          <form className="flex flex-col justify-center gap-4 px-10 py-10 lg:px-16">
            {/* alert */}
            <div className="alert alert-success text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Recovery email sent successfully</span>
            </div>
            {/* /alert */}
            {/* email */}
            <div className="form-control">
              <label className="label" htmlFor="input1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success"
                required
                id="input1"
              />
            </div>
            {/* /email */}
            {/* submit */}
            <button className="btn btn-neutral" type="submit">
              Recover
            </button>
            {/* /submit */}
            {/* login link */}
            <div className="label justify-end">
              <a className="link-hover link label-text-alt" href="index.html">
                Login
              </a>
            </div>
            {/* /login link */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
