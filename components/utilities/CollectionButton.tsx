"use client";
import { useEffect, useState } from "react";
import { CollectionProps, HandleCollectionEvent } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CollectionButton = ({
  anime_mal_id,
  user_email,
  anime_image,
  anime_title,
  isInCollection,
}: CollectionProps) => {

  const [isCollection, setIsCollection] = useState(isInCollection);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsCollection(isInCollection);
  }, [isInCollection]);

  const handleAddCollection = async (
    event: HandleCollectionEvent
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = { anime_mal_id, user_email, anime_image, anime_title };
      const response = await fetch("/api/v2/collection", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const collection = await response.json();

      if (collection.isCreated) {
        setIsCollection(true);
        router.refresh();
        toast.success("Added to collection");
      }
    } catch (error) {
      console.error("Failed to add to collection:", error);
      toast.error("Failed to add to collection");
      setIsCollection(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCollection = async (
    event: HandleCollectionEvent
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/v2/collection", {
        method: "DELETE",
        body: JSON.stringify({ anime_mal_id, user_email }),
      });
      const collection = await response.json();

      if (collection.isDeleted) {
        setIsCollection(false);
        router.refresh();
        toast.success("Deleted from collection");
      }
    } catch (error) {
      console.error("Failed to delete from collection:", error);
      toast.error("Failed to delete from collection");
      setIsCollection(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isCollection ? (
        <button
          type="submit"
          onClick={handleDeleteCollection}
          disabled={isLoading}
          className={`w-[210px] text-base text-light-text bg-light-secodary dark:bg-dark-secondary dark:text-dark-text py-1 rounded-full my-2
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Removing..." : "Delete from Collection"}
        </button>
      ) : (
        <button
          type="submit"
          onClick={handleAddCollection}
          disabled={isLoading}
          className={`w-[210px] text-base text-light-text bg-light-secodary dark:bg-dark-secondary dark:text-dark-text py-1 rounded-full my-2 
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Adding..." : "Add To Collection"}
        </button>
      )}
    </>
  );
};

export default CollectionButton;
