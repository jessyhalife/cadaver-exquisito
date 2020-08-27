import react, { FormEvent } from "react";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { Game } from "../types/Game";

type Props = {
  slug: string;
};
const GameConsole = ({ slug }: Props) => {
  const { set, data, error, loading } = useDocument<Game>(
    slug && `games/${slug}`
  );

  const openGame = async (event: FormEvent) => {
    event.preventDefault();
    data.status = "joining";
    try {
      await set(data, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h1>loading..</h1>;

  if (!loading && data && data) {
    return (
      <div className="text-center">
        <div className="text-2xl">
          Bienvenido a la sala de {data.description}
        </div>
        <div className="text-xl">
          Permite que los jugadores se unan haciendo click en `Abrir sala`
        </div>
        <div className="bg-blue-200">{data.status}</div>
        {data.status === "created" ? (
          <button
            type="submit"
            onClick={openGame}
            className="bg-orange-500 rounded m-2 shadow p-2"
          >
            Abrir sala
          </button>
        ) : (
          <button
            type="submit"
            onClick={openGame}
            className="bg-orange-500 rounded m-2 shadow p-2"
          >
            Comenzar juego
          </button>
        )}
      </div>
    );
  }
};

export default GameConsole;
