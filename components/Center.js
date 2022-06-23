/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Songs from "./Songs";
import { signOut } from "next-auth/react";

const fromColors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-pink-500",
  "from-purple-500",
  "from-fuchsia-500",
];
const toColors = [
  "to-indigo-900",
  "to-blue-900",
  "to-green-900",
  "to-red-900",
  "to-pink-900",
  "to-purple-900",
  "to-fuchsia-900",
];
function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [fromColor, setFromColor] = useState(null);
  const [toColor, setToColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  console.log(playlist);

  useEffect(() => {
    setFromColor(shuffle(fromColors).pop());
    setToColor(shuffle(toColor).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong", err));
  }, [spotifyApi, playlistId]);

  console.log("PLAYLIST INFO", playlist);
  return (
    <div
      className={`flex-grow h-screen overflow-y-scroll overflow-x-hidden bg-transparent pb-28`}
    >
      <header className="flex relative w-full items-end justify-end p-2">
        <div
          onClick={() => signOut()}
          className="flex items-center space-x-3 opacity-90 hover:opacity-80
        cursor-pointer rounded-full p-1 pr-2 text-white"
        >
          <img
            className="rounded-full h-10 w-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section className={`flex items-end space-x-7 p-8`}>
        <div className="flex flex-col">
          <img
            className="w-[10vw] object-contain shadow-2xl"
            src={playlist?.images?.[0]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <span>
            <p>
              {playlist
                ? playlist?.public
                  ? "PUBLIC PLAYLIST"
                  : "PRIVATE PLAYLIST"
                : ""}{" "}
            </p>
            <p className="text-4xl">{playlist?.description}</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {playlist?.name}
            </h1>
          </span>
          <span className="flex text-xs space-x-4">
            <p className="">
              {playlist ? `${playlist?.followers.total} Followers` : ""}
            </p>
            <h1 className="font-bold">{playlist?.owner.display_name}</h1>
          </span>
        </div>
      </section>
      <div className="border-t-white">
        <Songs />
      </div>
    </div>
  );
}

export default Center;
