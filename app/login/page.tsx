"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="m-4 min-h-[50vh] w-full max-w-sm lg:max-w-4xl">
        {/* <!-- logo --> */}
        <div className="flex items-center justify-center gap-2 p-8">
          <Image src="/beer.png" alt="Beer" width={20} height={20} />
          <h1 className="text-lg font-bold">Login to your account</h1>
        </div>
        {/* <!-- /logo --> */}
        <main className="grid rounded-lg bg-base-100 lg:aspect-[2/1] lg:grid-cols-2">
          {/* <!-- image --> */}
          <figure className="pointer-events-none overflow-hidden rounded-lg bg-base-300 object-cover max-lg:hidden">
            <div className="h-full w-full overflow-hidden">
              <Image
                src="/theboystonight.jpg"
                alt="The boys tonight"
                className="h-full w-full object-cover"
                width={1200}
                height={1200}
              />
            </div>
          </figure>
          {/* <!-- /image --> */}
          <form className="flex flex-col justify-center gap-4 px-10 py-10 lg:px-16">
            {/* <!-- email --> */}
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
            {/* <!-- /email --> */}
            {/* <!-- password --> */}
            <div className="form-control">
              <label className="label" htmlFor="input2">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered [&:user-invalid]:input-warning [&:user-valid]:input-success"
                required
                minLength={6}
                id="input2"
              />
            </div>
            {/* <!-- /password --> */}
            {/* <!-- remember me and recovery link --> */}
            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer gap-3 text-xs">
                <input
                  name="remember-me"
                  type="checkbox"
                  className="toggle toggle-xs"
                />
                Remember me
              </label>
              <div className="label">
                <a
                  className="link-hover link label-text-alt"
                  onClick={() => router.push("/reset-password")}
                >
                  Forgot password?
                </a>
              </div>
            </div>
            {/* <!-- /remember me and recovery link --> */}
            {/* <!-- submit --> */}
            <button className="btn btn-neutral" type="submit">
              Login
            </button>
            {/* <!-- /submit --> */}
            {/* <!-- login with google --> */}
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
            {/* <!-- /login with google --> */}
            {/* <!-- signup --> */}
            <div className="label justify-end">
              <a
                className="link-hover link label-text-alt"
                onClick={() => router.push("/signup")}
              >
                Create new account
              </a>
            </div>
            {/* <!-- /signup --> */}
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
