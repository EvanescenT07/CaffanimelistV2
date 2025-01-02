import prisma from "@/libs/prisma-db";
import { DeleteRequestBody, PostRequestBody } from "@/types";

export async function POST(request: Request) {
  const {
    anime_mal_id,
    user_email,
    username,
    anime_image,
    anime_title,
  }: PostRequestBody = await request.json();
  const data = { anime_mal_id, user_email, username, anime_image, anime_title };
  const createCollection = await prisma.collection.create({ data });

  if (!createCollection) {
    return new Response(
      JSON.stringify({
        isCreated: false,
        message: "Failed to create collection",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        isCreated: true,
        message: "Collection created successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(request: Request) {
  const { anime_mal_id, user_email }: DeleteRequestBody = await request.json();
  const data = { anime_mal_id, user_email };
  const deleteCollection = await prisma.collection.deleteMany({ where: data });

  if (deleteCollection.count === 0) {
    return new Response(
      JSON.stringify({
        isDeleted: false,
        message: "Failed to delete collection",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        isDeleted: true,
        message: "Collection deleted successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
