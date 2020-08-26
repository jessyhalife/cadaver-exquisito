import React from "react";
import { useRouter } from "next/router";
import { Game } from "../../types/Game";
import { useCollection } from "@nandorojo/swr-firestore";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { loading, data } = useCollection<Game>("games", {
    listen: true,
    where: ["slug", "==", slug],
  });
  if (loading) return <h1>loading...</h1>;
  if (!data || data.length === 0) return <h1>not found</h1>;
  console.log(data[0].status);
  if (data[0].status !== "joining")
    return <h1>Oops, too early, or too late</h1>;

  return <h1>{data[0].description}</h1>;
};

export default Slug;
