import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { Game } from "../../types/Game";
import { useDocument, useCollection } from "@nandorojo/swr-firestore";
import JoinGame from "../../components/JoinGame";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, set, error, loading } = useDocument<Game>(
    slug && `games/${slug}`,
    {
      listen: true,
    }
  );

  const joinRoom = async (event: FormEvent, nickname: string) => {
    event.preventDefault();
    try {
      let toSave = {
        ...data,
        players: [...data.players, { id: nickname, nickname: nickname }],
      };
      await set(toSave);
    } catch (error) {
      console.log(error);
    }
  };

  if (!slug || loading) return <h1>loading</h1>;

  if (!loading && slug && !data) router.push("/");

  if (data) return <JoinGame game={data} joinRoom={joinRoom} />;
};

export default Slug;
