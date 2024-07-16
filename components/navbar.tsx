import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();

  return (
    <div className="mt-6 w-2/3 rounded-lg">
      <div className="navbar rounded-lg bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-3xl">
            {" "}
            <Image src="/beer.png" alt="Beer" width={30} height={30} />
            Power Hour Generator
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a onClick={() => router.push("/login")}>Login</a>
              </li>
              {/* <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li> */}
            </ul>
          </div>
          {/* <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
