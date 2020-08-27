import react, { FormEvent, ReactNode } from "react";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { Game, Partida } from "../types/Game";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {
  slug: string;
  children: ReactNode;
};
const GameConsole = ({ slug, children }: Props) => {
  const router = useRouter();
  const { set, data, error, loading } = useDocument<Game>(
    slug && `games/${slug}`,
    { listen: true }
  );

  const { add, data: partida } = useCollection<Partida>("partidas", {
    listen: true,
    where: ["gameID", "==", slug],
  });

  const openGame = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await set({ ...data, status: "joining" }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };
  const startGame = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await set({ ...data, status: "playing" }, { merge: true });
      await add({
        gameID: data.slug,
        round: 1,
        player: 0
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <h1>loading..</h1>;

  if (!loading && data.exists) {
    switch (data.status) {
      case "created":
      case "joining":
        return (
          <div className="flex flex-col w-full p-24">
            <h1 className="capitalize text-4xl font-bold mb-1 text-center">
              Room <i>{data.description}</i>
            </h1>
            {data.status === "created" && (
              <div className="text-xl text-gray-700 font-bold mb-4">
                Permite que los jugadores se unan haciendo click en `Abrir sala`
              </div>
            )}

            {data.status === "created" ? (
              <div>
                <button
                  type="submit"
                  onClick={openGame}
                  className=" bg-orange-500 rounded m-2 shadow p-2"
                >
                  Abrir sala
                </button>
              </div>
            ) : (
              <div>
                <div className="m-12">{children}</div>
                <button
                  type="submit"
                  onClick={startGame}
                  className="inline bg-orange-500 rounded m-2 shadow p-2 disabled:opacity-50"
                  disabled={data.players.length < data.maxPlayers}
                >
                  Comenzar juego
                </button>
              </div>
            )}
          </div>
        );
      case "playing":
        console.log(partida);
        if (partida && partida.length) console.log(partida);
        return (
          <>
            <p>hols</p>
          </>
        );
      case "finished":
        return (
          <>
            <h1>Oops! el juego ya finalizó, crea uno nuevo!</h1>
            <Link href="/new">
              <button type="submit">Crear nuevo juego</button>
            </Link>
          </>
        );
    }
  } else {
    return (
      <>
        <h1>Oops! el juego que buscas no existe :(!</h1>
        <Link href="/new">
          <button type="submit">Crear nuevo juego</button>
        </Link>
      </>
    );
  }
};

export default GameConsole;
