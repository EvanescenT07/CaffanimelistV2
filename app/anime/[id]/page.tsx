import { FetchAPI } from "@/libs/api";
import { ParamsProps } from "../../../types";
import { AuthUserSession } from "@/libs/authUser";
import prisma from "@/libs/prisma-db";
import CollectionButton from "@/components/utilities/CollectionButton";
import VideoPlayer from "@/components/utilities/VideoPlayer";
import Image from "next/image";
import CommentBox from "@/components/utilities/CommentBox";
import InputComment from "@/components/utilities/InputComment";

const Page = async ({ params }: ParamsProps) => {
  const { id } = await params;
  const AnimeData = await FetchAPI({ resource: `anime/${id}`, query: "" });
  const User = await AuthUserSession();
  const Collection = await prisma.collection.findFirst({
    where: { user_email: User?.email ?? "", anime_mal_id: id },
  });

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col text-3xl text-light-text dark:text-dark-text font-bold">
          {AnimeData.data.title} - {AnimeData.data.title_japanese}
          <span className="text-xl text-light-text/30 dark:text-dark-text/30">
            {AnimeData.data.year}
          </span>
          {User && (
            <CollectionButton
              anime_mal_id={id}
              user_email={User?.email ?? ""}
              anime_image={AnimeData.data.images.webp.image_url}
              anime_title={AnimeData.data.title}
              isInCollection={!!Collection}
            />
          )}
          <div className="flex gap-2 mt-4">
            <div className="py-1 w-[120px] h-[50px] flex flex-col justify-center items-center text-light-text dark:text-dark-text border rounded-full border-light-accent dark:border-dark-accent">
              <h3 className="font-bold text-sm leading-none">Rank</h3>
              <span className="text-sm">{AnimeData.data.rank}</span>
            </div>
            <div className="py-1 w-[120px] h-[50px] flex flex-col justify-center items-center text-light-text dark:text-dark-text border rounded-full border-light-accent dark:border-dark-accent">
              <h3 className="font-bold text-sm leading-none">Score</h3>
              <span className="text-sm">{AnimeData.data.score}</span>
            </div>
            <div className="py-1 w-[120px] h-[50px] flex flex-col justify-center items-center text-light-text dark:text-dark-text border rounded-full border-light-accent dark:border-dark-accent">
              <h3 className="font-bold text-sm leading-none">Type</h3>
              <span className="text-sm">{AnimeData.data.type}</span>
            </div>
            <div className="py-1 w-[120px] h-[50px] flex flex-col justify-center items-center text-light-text dark:text-dark-text border rounded-full border-light-accent dark:border-dark-accent">
              <h3 className="font-bold text-sm leading-none">Episode</h3>
              <span className="text-sm">{AnimeData.data.episodes}</span>
            </div>
            <div className="py-1 w-[150px] h-[50px] flex flex-col justify-center items-center text-light-text dark:text-dark-text border rounded-full border-light-accent dark:border-dark-accent">
              <h3 className="font-bold text-sm leading-none text-center">
                Status
              </h3>
              <span className="text-sm text-center">
                {AnimeData.data.status}
              </span>
            </div>
          </div>
          <div className="mt-4 text-xl text-light-text/70 dark:text-dark-text/70">
            {AnimeData.data.genres
              .map((genre: { name: string }) => genre.name)
              .join(", ")}
          </div>
          <div className="flex sm:flex-nowrap flex-wrap pt-4 gap-2 text-color-white">
            <div className="w-1/3">
              <Image
                src={AnimeData.data.images.webp.image_url}
                alt="anime-image"
                width={1080}
                height={1080}
                quality={100}
                priority
                className="rounded w-full h-auto object-cover"
                unoptimized
              />
            </div>
            <div className="w-2/3 mx-5">
              <p className="text-lg text-justify">{AnimeData.data.synopsis}</p>
            </div>
          </div>
          <div className="py-7">
            <h3 className=" text-light-text dark:text-dark-text text-xl font-bold">Comment</h3>
            <CommentBox anime_mal_id={id} />
            {User && (
              <InputComment
                anime_mal_id={id}
                user_email={User?.email ?? ""}
                username={User?.name ?? ""}
                anime_title={AnimeData.data.title}
              />
            )}
          </div>
          <div>
            <VideoPlayer videoID={AnimeData.data.trailer.youtube_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
