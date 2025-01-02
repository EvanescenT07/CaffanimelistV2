"use client";

import { APIProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const RecommendationAnime = ({ api }: APIProps) => {
  const [displayLimit, setDisplayLimit] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      setDisplayLimit(window.innerWidth < 768 ? 4 : 8);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      <div className="px-4 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
        {api.data?.slice(0, displayLimit).map((animeData, index) => (
          <Link
            href={`/anime/${animeData.mal_id}`}
            className="cursor-pointer text-color-white hover:text-color-secondary transition-all"
            key={index}
          >
            <div className="flex flex-col gap-2">
              <Image
                className="w-full h-[200px] object-cover rounded"
                src={animeData.images.webp.image_url}
                alt="anime-cover"
                width={512}
                height={512}
              />
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-sm text-center">
                  {animeData.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendationAnime;
