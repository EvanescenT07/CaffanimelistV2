"use client";

import { APIProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AnimeList = ({ api }: APIProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 3 : 8);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= api.data.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? Math.max(0, api.data.length - itemsPerPage)
        : prevIndex - itemsPerPage
    );
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
        {api.data
          ?.slice(currentIndex, currentIndex + itemsPerPage)
          .map((animeData, index) => (
            <Link
              href={`/anime/${animeData.mal_id}`}
              className="cursor-pointer text-color-white hover:text-color-secondary transition-all"
              key={index}
            >
              <div className="flex flex-col gap-2 items-center">
                <Image
                  className="w-[180px] h-[280px] object-fill rounded"
                  src={animeData.images.webp.image_url}
                  alt="anime-cover"
                  width={512}
                  height={512}
                />
                <div className="flex flex-col justify-center items-center ">
                  <h3 className="font-bold text-sm">{animeData.title}</h3>
                </div>
              </div>
            </Link>
          ))}
      </div>

      <div className="flex justify-between md:justify-center md:gap-[250px] mt-4 px-8 md:px-0">
        <button
          title="Previous"
          onClick={prevSlide}
          className="p-2 bg-light-second dark:bg-dark-second rounded-full hover:bg-light-accent dark:hover:bg-dark-accent transition-all duration-500"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          title="Next"
          onClick={nextSlide}
          className="p-2 bg-light-second dark:bg-dark-second rounded-full hover:bg-light-accent dark:hover:bg-dark-accent transition-all duration-500"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnimeList;
