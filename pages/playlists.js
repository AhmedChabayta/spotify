/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import FetchFeatured from "../components/FetchFeatured";
import useSpotify from "../hooks/useSpotify";
import { FlexCol, FlexRow, Text, Wrapper } from "../styles/common.styles";
import Songs from "../components/Songs";
import { useEffect } from "react";
import tw from "twin.macro";

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.error("Something went wrong", err));
  }, [spotifyApi, playlistId]);

  return (
    <Wrapper tw="flex-grow w-full h-screen overflow-y-scroll scrollbar-hide overflow-x-hidden bg-transparent pb-28">
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

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold">
              {playlist?.name}
            </h1>
            <Text tw="text-lg text-gray-900">{playlist?.description}</Text>
          </FlexCol>
          <FlexRow tw="text-sm items-center space-x-4">
            <span className="flex items-center">
              {playlist?.owner?.display_name === "Spotify" ? (
                <img
                  className="w-10 object-contain"
                  src="/Logo-Spotify.png"
                  alt=""
                />
              ) : (
                ""
              )}
              <h1 className="font-bold">{playlist?.owner?.display_name}</h1>
            </span>
            <Text>
              {playlist ? `${playlist?.followers?.total} Followers` : ""}
            </Text>
          </FlexRow>
        </FlexCol>
      </FlexRow>
      {playlist ? (
        <Wrapper tw="border-t-white h-screen">
          <Songs />
        </Wrapper>
      ) : (
        ""
      )}
    </Wrapper>
  );
}

export default Center;
