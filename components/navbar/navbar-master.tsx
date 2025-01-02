import Link from "next/link";
import InputSearch from "@/components/navbar/inputSearch";
import AuthButton from "@/components/navbar/authButton";
import ThemeSwitcher from "@/components/theme/theme-switcher";

const Navbar = () => {
  return (
    <header className="w-full bg-light-secodary dark:bg-dark-secondary">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4  p-4">
        <Link href="/" className="text-2xl font-bold">
          <span className="">Caffanimelist</span>
          <span className="text-light-text/60 dark:text-dark-text/60">V2</span>
        </Link>
        <InputSearch />
        <div className="flex flex-row justify-center items-center gap-8">
          <AuthButton />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
