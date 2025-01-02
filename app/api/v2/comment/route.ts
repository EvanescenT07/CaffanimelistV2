import prisma from "@/libs/prisma-db";
import { NextResponse } from "next/server";

type CommentData = {
  anime_mal_id: string;
  user_email: string;
  comment: string;
  username: string;
  anime_title: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const anime_mal_id = searchParams.get("anime_mal_id");

    if (!anime_mal_id) {
      return NextResponse.json(
        { error: "anime_mal_id is required" },
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        anime_mal_id: String(anime_mal_id),
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        username: true,
        anime_mal_id: true,
        anime_title: true,
        comment: true,
        created_at: true,
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data: CommentData = {
      anime_mal_id: body.anime_mal_id,
      user_email: body.user_email,
      comment: body.comment,
      username: body.username,
      anime_title: body.anime_title,
    };

    if (
      !data.anime_mal_id ||
      !data.anime_title ||
      !data.user_email ||
      !data.comment ||
      !data.username
    ) {
      return NextResponse.json(
        { isCreated: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        anime_mal_id: data.anime_mal_id,
        anime_title: data.anime_title,
        user_email: data.user_email,
        comment: data.comment,
        username: data.username,
      },
    });

    return NextResponse.json(
      { isCreated: true, data: comment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { isCreated: false, error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
