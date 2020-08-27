import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";

import { useDocument, useCollection } from "@nandorojo/swr-firestore";
import JoinGame from "../../components/JoinGame";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import GamePlay from "../../components/GamePlay";

const Slug = () => {
  const [value, setValue] = useSessionStorage("cadaver-nickname", "");
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
        players: [...data.players, { nickname }],
      };
      await set(toSave);
      setValue(nickname);
    } catch (error) {
      console.log(error);
    }
  };

  if (!slug || loading) return <h1>loading</h1>;

  if (!loading && slug && !data) router.push("/");

  if (data && data.status === "joining")
    if (!data.players.find((x) => x.nickname === value))
      return <JoinGame game={data} joinRoom={joinRoom} />;
    else return <h1>ya casi empieza!...</h1>;
  if (data && data.status === "playing")
    return <GamePlay slug={slug as string} />;
};

export default Slug;
