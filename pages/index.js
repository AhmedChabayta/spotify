import { shuffle } from "lodash";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Center from "../components/center";
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
  console.log(toColor);
  return (
    <div
      className={`bg-gradient-to-t text-white from-${fromColor} to-${toColor} h-screen overflow-hidden`}
    >
      <Head>
        <title>Spotify</title>
      </Head>
      <main className="flex text-white">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}
