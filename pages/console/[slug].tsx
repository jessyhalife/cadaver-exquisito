import react, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import PlayersList from "../../components/PlayersList";
import GameConsole from "../../components/GameConsole";

const Console = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    if (slug != game) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [slug]);
  const [game] = useLocalStorage("games", "");

  return (
    <>
      {loading ? (
        <h1>Loading game data.. </h1>
      ) : (
        <div className="text-center">
          <GameConsole slug={slug as string} />
          <PlayersList slug={slug as string} />
        </div>
      )}
    </>
  );
};

export default Console;
