import react from "react";
import { useCollection } from "@nandorojo/swr-firestore";
import { Partida, Game } from "../types/Game";
import { useSessionStorage } from "../hooks/useSessionStorage";

type Props = {
  slug: string;
};
const GamePlay = ({ slug }: Props) => {
  const [value, setValue] = useSessionStorage("cadaver-nickname", "");
  const { data: partida, loading, error } = useCollection<Partida>("partidas", {
    listen: true,
    where: ["gameID", "==", slug],
  });
  const { data: game, loading: loadingGame } = useCollection<Game>("games", {
    listen: true,
    where: ["slug", "==", slug],
  });
  if (loading || loadingGame) return <h1>Loading..</h1>;
  if (
    !loading &&
    !loadingGame &&
    partida &&
    partida.length &&
    game &&
    game.length
  ) {
    if (game[0].players[partida[0].player].nickname === value)
      return <h1>Tu turno!</h1>;
    return (
      <h1>
        Esperando partida de {game[0].players[partida[0].player].nickname}
      </h1>
    );
  }
};
export default GamePlay;
