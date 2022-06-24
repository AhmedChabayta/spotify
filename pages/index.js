import { shuffle } from "lodash";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

const fromColors = [
  "indigo-500",
  "blue-500",
  "green-500",
  "red-500",
  "pink-500",
  "purple-500",
  "fuchsia-500",
];
const toColors = [
  "indigo-900",
  "blue-900",
  "green-900",
  "red-900",
  "pink-900",
  "purple-900",
  "fuchsia-900",
];

export default function Home() {
  const [fromColor, setFromColor] = useState(null);
  const [toColor, setToColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  useEffect(() => {
    setFromColor(shuffle(fromColors).pop());
    setToColor(shuffle(toColors).pop());
  }, [playlistId]);

  return (
    <div className="bg-gray-900 h-screen overflow-hidden">
      <Head>
        <title>Spotify</title>
      </Head>
      <main className="flex text-white bg-gray-900">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}
