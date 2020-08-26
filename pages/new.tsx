import React from "react";
import GameForm from "../components/GameForm";

const NewGame = () => {
  return (
    <>
      <h1 className="py-2 text-2xl font-bold">Create new game</h1>
      <h2>
        Dolor qui veniam ipsum laboris quis velit. Cillum consequat mollit id
        pariatur in amet laboris voluptate nostrud ea. Consectetur exercitation
        pariatur sunt dolor cupidatat. In velit cupidatat anim adipisicing.
      </h2>
      <div className="my-4">
        <GameForm />
      </div>
    </>
  );
};

export default NewGame;
