import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Cadaver Exquisito</title>
        <link
          rel="icon"
          href="https://media.dayoftheshirt.com/images/shirts/Mi3Hu/neatoshop_skull-nerd_1510229580.large.png"
        />
      </Head>
      <main className="container text-center">
        <div className="p-10">
          <div className="py-2">
            <h1 className="text-2xl font-bold">Cadaver exquisíto</h1>
          </div>
          <p className="text-xl">
            El cadáver exquisíto es un juego de creacion colectiva donde cada
            participante hará su aporte sin saber cuál es el aporte que hacen
            los demás. Y la sumatoria de esos aportes individuales generarán una
            obra que no ha sido imaginada previamente.
          </p>
        </div>
        <hr className="m-10"></hr>
        <div className="py-4">
          <p className="font-bold m-2">Cómo jugar?</p>
          <div>
            Durante la partida, cada jugador, llegado su turno, deberá escribir
            un párrafo de una <i>historia/cuento/relato</i> sin poder ver lo que
            escribieron el resto de los participantes.
            <p>
              Al terminar el juego podrán leer el resultado de la obra
              colectiva!
            </p>
          </div>
        </div>
        <hr className="m-10"></hr>
        <div className="text-center">
          <Link href="/new">
            <button className="bg-orange-500 p-2 rounded shadow" type="submit">
              Comenzar
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
