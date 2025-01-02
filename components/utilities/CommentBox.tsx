import prisma from "@/libs/prisma-db";
import React from "react";

const CommentBox = async ({ anime_mal_id }: { anime_mal_id: string }) => {
  const comments = await prisma.comment.findMany({
    where: { anime_mal_id },
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-7">
      {comments.map((comment) => {
        return (
          <div
            className="flex flex-col p-4 text-light-text dark:text-dark-text bg-light-accent dark:bg-dark-accent rounded-lg shadow-sm h-full min-h-[100px] max-h-[180px] overflow-hidden"
            key={comment.id}
          >
            <div className="pb-2 border-b border-black/10 ">
              <p className="text-lg font-bold text-black/80 dark:text-white/80 truncate">
                {comment.username}
              </p>
            </div>

            <div className="flex-grow overflow-y-auto">
              <p className="text-sm text-black/60 dark:text-white/60 mt-2 whitespace-pre-wrap">
                {comment.comment}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentBox;
