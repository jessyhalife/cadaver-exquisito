import react from "react";
import { useCollection } from "@nandorojo/swr-firestore";
import { Game } from "../types/Game";

type Props = {
  slug: string;
};
const PlayersList = ({ slug }: Props) => {
  const { data } = useCollection<Game>("games", {
    listen: true,
    where: ["slug", "==", slug],
  });
  console.log(data);
  return (
    <>
      <ul>
        {data && data[0].players.map((p) => <li key={p.id}>{p.nickname}</li>)}
      </ul>
    </>
  );
};

export default PlayersList;
