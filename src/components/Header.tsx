import Link from "next/link";

export default function Header() {
  return (
    <div className="h-[5dvh] flex flex-row bg-[#0d1117] justify-between border-b">
      <Link
        href="/"
        className="flex flex-col justify-center px-8 hover:cursor-pointer hover:bg-[#24292f] hover:font-bold"
      >
        <p className="text-lg">ToDo App</p>
      </Link>
      <div className="flex flex-row">
        <Link
          href="/signup"
          className="flex flex-col justify-center px-8 hover:cursor-pointer hover:bg-[#24292f] hover:font-bold"
        >
          <p>Sign Up</p>
        </Link>
        <Link
          href="/login"
          className="flex flex-col justify-center px-8 hover:cursor-pointer hover:bg-[#24292f] hover:font-bold"
        >
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
}
