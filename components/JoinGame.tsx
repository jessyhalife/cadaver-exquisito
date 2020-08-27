import react, { useState, FormEvent } from "react";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import { Game } from "../types/Game";
import { useSessionStorage } from "../hooks/useSessionStorage";

type Props = {
  game: Game;
  joinRoom: (event: FormEvent, nickname: string) => void;
};

const JoinGame = ({ game, joinRoom }: Props) => {
  const [nickname, setNickname] = useState("");

  return (
    <>
      <h1>Enter room {game.description}</h1>
      <form onSubmit={(event: FormEvent) => joinRoom(event, nickname)}>
        <fieldset>
          <label>nickname</label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            value={nickname}
            onChange={({ target }) => setNickname(target.value)}
          />
        </fieldset>
        <button type="submit">JOIN ROOM</button>
      </form>
    </>
  );
};

export default JoinGame;
