import { AuthUserSession } from "@/libs/authUser";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const User = await AuthUserSession();

  return (
    <div className="flex flex-col mt-7 text-light-text dark:text-dark-text justify-center items-center">
      <Image
        src={User?.image || "/default-avatar.png"}
        alt="User Avatar"
        width={150}
        height={150}
        quality={100}
        className="object-cover rounded-full w-48 h-48"
      />
      <h3 className="text-xl font-medium py-4">
        Hi,<span className="font-bold">{User?.name}</span>
      </h3>

      <div className="flex flex-col gap-5 py-5">
        <Link
          href="/users/dashboard/collection"
          className="bg-light-secodary dark:bg-dark-secondary text-light-text dark:text-dark-text px-5 py-2 rounded-full text-lg font-bold"
        >
          My Collection
        </Link>
        <Link
          href="/users/dashboard/comment"
          className="bg-light-secodary dark:bg-dark-secondary text-light-text dark:text-dark-text px-5 py-2 rounded-full text-lg font-bold"
        >
          My Comments
        </Link>
      </div>
    </div>
  );
};

export default Page;
