"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const InputSearch = () => {
  const router = useRouter();
  const searchRef = useRef(null);

  const searchHandler = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const CurrentValue = searchRef.current
      ? (searchRef.current as HTMLInputElement).value
      : "";
    if (CurrentValue.trim() !== "") {
      router.push(`/search/${CurrentValue}`);
    } else if (!CurrentValue) {
      return;
    }
  };

  const pressEnterHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      searchHandler(event);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Anime..."
        ref={searchRef}
        onKeyDown={pressEnterHandler}
        className="w-full md:w-[350px] p-2 rounded "
      />
      <button
        className="absolute top-3 end-2"
        onClick={searchHandler}
        type="submit"
        title="Search"
      >
        <FaMagnifyingGlass />
      </button>
    </div>
  );
};

export default InputSearch;
