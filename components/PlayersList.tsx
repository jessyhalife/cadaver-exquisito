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
      <h1>Jugadores:</h1>
      <ul>
        {data &&
          data[0]?.players.map((p) => (
            <li key={hash(p)}>{p}</li>
          ))}
      </ul>
    </>
  );
};

export default PlayersList;
