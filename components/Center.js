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

const colors = [
  "bg-indigo-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-fuchsia-500",
];
function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  console.log(playlist);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong", err));
  }, [spotifyApi, playlistId]);
  console.log(playlist);
  return (
    <div className={`flex-grow h-screen overflow-y-scroll ${color}`}>
      <header className="flex relative w-full items-end justify-end p-2">
        <div
          onClick={() => signOut()}
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80
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
      <section className={`flex items-end space-x-7 h-80 p-8`}>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold pb-5">
            {playlist?.owner.display_name}
          </h1>
          <img
            className="w-44 object-contain shadow-2xl"
            src={playlist?.images?.[0]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <span>
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
      <div className="border-t-white bg-black/50 min-h-full pt-10">
        <Songs color={color} />
      </div>
    </div>
  );
}

export default Center;
