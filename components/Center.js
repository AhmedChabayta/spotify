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
import { FlexCol, FlexRow, Text, Wrapper } from "../styles/common.styles";
import tw from "twin.macro";

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
    <Wrapper tw="flex-grow h-screen overflow-y-scroll overflow-x-hidden bg-transparent pb-28">
      <FlexRow tw="relative w-full items-end justify-end p-2">
        <FlexRow
          onClick={() => signOut()}
          tw="items-center space-x-3 opacity-90 hover:opacity-80
        cursor-pointer rounded-full p-1 pr-2 text-white"
        >
          <img
            className="rounded-full h-10 w-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </FlexRow>
      </FlexRow>
      <FlexRow tw="items-end space-x-7 p-8">
        <FlexCol>
          <img
            className="w-[10vw] object-contain shadow-2xl"
            src={playlist?.images?.[0]?.url}
            alt=""
          />
        </FlexCol>
        <FlexCol className="flex flex-col">
          <FlexCol>
            <Text>
              {playlist
                ? playlist?.public
                  ? "PUBLIC PLAYLIST"
                  : "PRIVATE PLAYLIST"
                : ""}{" "}
            </Text>
            <Text tw="text-4xl">{playlist?.description}</Text>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {playlist?.name}
            </h1>
          </FlexCol>
          <FlexRow tw="text-xs space-x-4">
            <Text>
              {playlist ? `${playlist?.followers.total} Followers` : ""}
            </Text>
            <h1 className="font-bold">{playlist?.owner.display_name}</h1>
          </FlexRow>
        </FlexCol>
      </FlexRow>
      <Wrapper tw="border-t-white">
        <Songs />
      </Wrapper>
    </Wrapper>
  );
}

export default Center;
