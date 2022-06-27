import { shuffle } from "lodash";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Center from "../components/Center";
import Featured from "../components/Featured";
import Latest from "../components/Latest";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import useSpotify from "../hooks/useSpotify";

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
  const [latest, setLatest] = useState([]);
  const spotifyApi = useSpotify();
  const [fromColor, setFromColor] = useState();
  const playlistId = useRecoilValue(playlistIdState);
  useEffect(() => {
    setFromColor(shuffle(fromColors).pop());
  }, [playlistId]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {latest?.map((latest, i) => (
        <Latest key={i} latest={latest} />
      ))}
      <Featured />
    </div>
  );
}
