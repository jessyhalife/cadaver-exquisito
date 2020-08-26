import react, { FormEvent } from "react";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { Game } from "../types/Game";

type Props = {
  slug: string;
};
const GameConsole = ({ slug }: Props) => {
  const { set, data, loading } = useDocument<Game>("games", {
    listen: true,
  });
  const openGame = (event: FormEvent) => {
    event.preventDefault();
    data[0].status = "joining";
    data[0].description = "CAMBIAN2";
    console.log(data[0]);
    set(data[0], { merge: true })
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  };
  if (loading) return <h1>loading..</h1>;
  if (!loading && data && data[0]) {
    return (
      <div className="text-center">
        <div className="text-2xl">Welcome to {data[0].description}</div>
        <div className="text-xl">
          Allow players to join by sharing link and click "Open room"
        </div>
        <div className="bg-blue-200">{data[0].status}</div>
        <button
          type="submit"
          onClick={openGame}
          className="bg-orange-500 rounded m-2 shadow p-2"
        >
          Open room
        </button>
      </div>
    );
  }
};

export default GameConsole;
