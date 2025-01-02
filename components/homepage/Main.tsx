import Image from "next/image";
import { APIProps } from "../../types";
import Link from "next/link";

const MainAnime = ({ api }: APIProps) => {
  return (
    <div className="relative">
      {api.data?.map((animeData, index) => (
        <Link
          href={`/anime/${animeData.mal_id}`}
          className="block w-full h-full"
          key={index}
        >
          <div className="relative w-full h-full">
            <Image
              className="w-full h-full object-cover rounded-lg transform-none animate-none"
              src={animeData.images.webp.image_url}
              alt="anime-cover"
              width={1080}
              height={1080}
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-2xl text-white">
                {animeData.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainAnime;
