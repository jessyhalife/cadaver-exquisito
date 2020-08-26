import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useCollection } from "@nandorojo/swr-firestore";
import { Game } from "../types/Game";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GameForm = () => {
  const router = useRouter();
  const { add } = useCollection<Game>("games");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    slug: "",
    description: "",
    passcode: "",
    duration: 3,
    maxPlayers: 5,
    rounds: 2,
    status: "created" as const,
    createdBy: "",
    players: [{ id: "jes", nickname: "jessyhalife" }],
    content: [],
    createdAt: new Date(),
  });
  const [games, setGame] = useLocalStorage("games", "");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await add(formData);
      setGame(formData.slug);
      router.push(`console/${formData.slug}`);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold p-4">Customize game</h1>
      <div className="container">
        <form onSubmit={submit}>
          <fieldset className="flex">
            <input
              type="text"
              name="slug"
              id="slug"
              placeholder="name"
              value={formData.slug}
              onChange={({ target }) => {
                setFormData({
                  ...formData,
                  slug: target.value,
                });
              }}
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="description"
              value={formData.description}
              onChange={({ target }) => {
                setFormData({
                  ...formData,
                  description: target.value,
                });
              }}
            />
            <input
              type="password"
              name="passcode"
              id="passcode"
              placeholder="passcode"
              value={formData.passcode}
              onChange={({ target }) => {
                setFormData({
                  ...formData,
                  passcode: target.value,
                });
              }}
            />
            <input
              type="number"
              name="duration"
              id="duration"
              placeholder="duration"
              value={formData.duration}
              onChange={({ target }) => {
                setFormData({
                  ...formData,
                  duration: parseInt(target.value),
                });
              }}
            />
            <input
              type="number"
              name="maxPlayers"
              id="maxPlayers"
              placeholder="Max players"
              value={formData.maxPlayers}
              onChange={({ target }) => {
                setFormData({
                  ...formData,
                  maxPlayers: parseInt(target.value),
                });
              }}
            />
            <input
              type="number"
              name="rounds"
              id="rounds"
              placeholder="#rounds"
              value={formData.rounds}
              onChange={({ target }) => {
                setFormData({
                  ...formData,
                  rounds: parseInt(target.value),
                });
              }}
            />
          </fieldset>
          <div className="text-red-700">{message}</div>
          <button className="bg-blue-500 p-2 text-white rounded shadow text-bold">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameForm;
