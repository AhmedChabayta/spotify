import { shuffle } from "lodash";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

const fromColors = [
  "from-indigo-900",
  "from-blue-900",
  "from-green-900",
  "from-red-900",
  "from-pink-900",
  "from-purple-900",
  "from-fuchsia-900",
];

export default function Home() {
  const [fromColor, setFromColor] = useState();
  const playlistId = useRecoilValue(playlistIdState);
  useEffect(() => {
    setFromColor(shuffle(fromColors).pop());
  }, [playlistId]);

  return (
    <div className="h-screen overflow-hidden">
      <Head>
        <title>Spotify</title>
      </Head>
      <main className={`flex text-white bg-gradient-to-b ${fromColor} `}>
        <Sidebar />
        <Center />
      </main>
      <div className="fixed bottom-0 w-screen">
        <Player />
      </div>
    </div>
  );
}
