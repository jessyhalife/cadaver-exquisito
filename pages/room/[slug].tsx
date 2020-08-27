import react, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";

import PlayersList from "../../components/PlayersList";
import GameConsole from "../../components/GameConsole";

const Console = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      {!slug ? (
        <h1>Cargado sala... </h1>
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
