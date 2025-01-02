import Link from "next/link";
import { AuthUserSession } from "@/libs/authUser";

const AuthButton = async () => {
  const user = await AuthUserSession();
  const actionLabel = user ? "Logout" : "Login";
  const actionPath = user ? "/api/auth/signout" : "/api/auth/signin";

  return (
    <div className="flex gap-4 justify-between">
      {user && (
        <Link
          href="/users/dashboard"
          className="bg-light-accent dark:bg-dark-accent rounded-xl px-4 py-2 text-black dark:text-white"
        >
          Dashboard
        </Link>
      )}
      <Link
        href={actionPath}
        className="bg-light-accent dark:bg-dark-accent rounded-xl px-4 py-2 text-black dark:text-white"
      >
        {actionLabel}
      </Link>
    </div>
  );
};

export default AuthButton;
