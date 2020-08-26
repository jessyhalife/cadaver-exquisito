import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container text-center">
        <div className="py-2">
          <h1 className="text-2xl font-bold">Cadaver exquisíto</h1>
        </div>
        <div className="py-4">
          Magna ad laborum incididunt incididunt nisi ad irure. Ullamco dolor
          dolore irure dolore commodo non cupidatat enim aute. Sit consectetur
          non eiusmod non deserunt reprehenderit minim.
        </div>
        <div className="text-center">
          <Link href="/new">
            <button className="bg-orange-500 p-2 rounded shadow" type="submit">
              Start
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
