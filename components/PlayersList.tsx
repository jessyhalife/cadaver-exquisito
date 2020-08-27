import react from "react";
import { useDocument, useCollection } from "@nandorojo/swr-firestore";
import { Game } from "../types/Game";
import hash from "object-hash";

type Props = {
  slug: string;
};
const PlayersList = ({ slug }: Props) => {
  const { data, loading } = useCollection<Game>(`games`, {
    where: ["slug", "==", slug],
    listen: true,
  });

  if (loading) return <></>;
  if (!data && !loading) return <></>;
  if (data) console.log(data);
  return (
    <>
      <h1 className="text-2xl font-bold">Jugadores:</h1>
      <div className="text-sm font-semibold">Restantes: {data[0].maxPlayers - data[0].players.length}</div>
      <ul className="text-left text-gray-800 font-semibold">
        {data &&
          data[0]?.players.map((p) => (
            <li key={hash(p.nickname)}>{p.nickname}</li>
          ))}
      </ul>
    </>
  );
};

export default PlayersList;
