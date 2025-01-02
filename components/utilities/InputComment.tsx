"use client";

import { HandleCollectionEvent, InputCommentProps } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const InputComment = ({
  anime_mal_id,
  user_email,
  username,
  anime_title,
}: InputCommentProps) => {
  const [comment, setComment] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment((event.target as HTMLTextAreaElement).value);
    setErrorMessage("");
  };

  const handlePosting = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();

    if (comment.trim() === "") {
      setErrorMessage("Please input your comment!");
      return;
    }

    const data = { anime_mal_id, user_email, comment, username, anime_title };
    const response = await fetch("/api/v2/comment", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const postComment = await response.json();
    if (postComment.isCreated) {
      setIsCreated(true);
      setComment("");
      router.refresh();
      toast.success("Comment has been sent");
    }
    setTimeout(() => {
      setIsCreated(false);
    }, 60000);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (comment.trim() === "") {
        setErrorMessage("Please input your comment!");
        toast.error("Please input your comment!");
        return;
      }
      handlePosting(event as React.KeyboardEvent<HTMLTextAreaElement>);

      setTimeout(() => {
        setIsCreated(false);
      }, 60000);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        placeholder="Write your comment here..."
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        value={comment}
        className="w-full h-32 p-2 rounded-xl text-base text-light-text dark:text-dark-text bg-black/60"
      />
      <button
        type="submit"
        onClick={handlePosting}
        disabled={comment.trim() === ""}
        className={`w-[120px] py-2 mt-4 rounded-xl text-base text-light-text bg-light-secondary dark:text-dark-text dark:bg-dark-accent ${
          comment.trim() === "" ? "cursor-not-allowed" : ""
        }`}
      >
        Submit
      </button>
      {errorMessage && <p className=" text-red-700">{errorMessage}</p>}
      {isCreated && (
        <p className="text-light-text dark:text-dark-text text-base">
          Comment has been sent...
        </p>
      )}
    </div>
  );
};

export default InputComment;
