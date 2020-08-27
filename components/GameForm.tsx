import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDocument } from "@nandorojo/swr-firestore";
import { Game } from "../types/Game";

import hash from "object-hash";
import { useSessionStorage } from "../hooks/useSessionStorage";
import randomWords from "random-spanish-words";

const GameForm = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [value, setValue] = useSessionStorage("cadaver-nickname", "");
  const [nickname, setNickname] = useState(value || "");
  const [formData, setFormData] = useState({
    slug: "",
    description: randomWords(5).join(" "),
    passcode: "",
    duration: 30,
    maxPlayers: 5,
    rounds: 3,
    status: "created" as const,
    createdBy: "",
    players: [],
    content: [],
    createdAt: new Date(),
  });
  const [id, setId] = useState(hash(new Date().toLocaleString()));
  const { set, data } = useDocument<Game>(`games/${id}`);
  const [isProcessing, setProcessing] = useState(false);
  const cleanSlug = (slug: string) => {
    return slug.replace(/[^a-zA-Z0-9-_]/g, "-");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (data.exists) setMessage("Ese código ya existe, elegí otro!");
    try {
      setProcessing(true);

      await set(
        { ...formData, slug: id, players: [...formData.players, { nickname }] },
        { merge: true }
      );
      setValue(nickname);
      setProcessing(false);
      router.push(`room/${id}`);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setProcessing(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold p-4 text-center">Configurar juego</h1>
      <div className="flex flex-col lg:ml-12 md:ml-6 items-center">
        <form onSubmit={submit}>
          <div className="w-full max-w-lg mt-4  px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Acceso a sala
              <div className="text-xs text-gray-600 mt-1 mb-2 font-normal">
                Esta será la dirección donde van a ingresar tus amigos.
                <br />
                <b>
                  https://cadaver-exquisito.now.sh/exquisito/
                  <i>el-código-que-ingreses</i>
                </b>
              </div>
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="slug"
              id="slug"
              placeholder="url"
              value={id}
              onChange={({ target }) => {
                setFormData({
                  ...formData,
                  slug: cleanSlug(target.value),
                });
                setId(cleanSlug(target.value));
              }}
            />
          </div>
          <div className="w-full max-w-lg mt-4  px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descripción
            </label>
            <input
              className="capitalize appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
          </div>
          {/* <div className="w-full max-w-lg mt-4  px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold ">
              Código de acceso a sala
              <div className="text-xs text-gray-600 mt-1 mb-2 font-normal">
                opcional! para que sólo tus amigos puedan ingresar
              </div>
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
          </div> */}
          <div className="w-full max-w-lg mt-4  px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Duración de turno (segundos)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
          </div>
          <div className="w-full max-w-lg mt-4  px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Máxima cantidad de jugadores
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
          </div>
          <div className="w-full max-w-lg mt-4  px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Número de rondas
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
          </div>
          <div className="w-full max-w-lg mt-4  px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tu nombre de usuario
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="nickname"
              id="nickname"
              placeholder="nickname"
              value={nickname}
              onChange={({ target }) => {
                setNickname(target.value);
              }}
            />
          </div>

          <div className="text-red-700">{message}</div>

          <div className="text-center mt-10 mb-5">
            <button
              disabled={isProcessing}
              className="bg-orange-500 p-2 text-white rounded shadow text-bold disabled:opacity-50"
            >
              Crear sala
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GameForm;
