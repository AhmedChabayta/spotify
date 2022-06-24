/* eslint-disable @next/next/no-img-element */
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
  CogIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ButtonsSidebar from "./ButtonsSidebar";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSongInfo from "../hooks/useSongInfo";
import { imageState } from "../atoms/sidebarAtom";
import {
  FlexCol,
  FlexRow,
  Hr,
  Image,
  ImageWrapper,
  Text,
} from "../styles/common.styles";
import tw from "twin.macro";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  const [currentImageState, setCurrentImageState] = useRecoilState(imageState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  const songInfo = useSongInfo();
  console.log("PLAYLISTS", playlists);
  return (
    <FlexCol tw="text-xs lg:text-sm min-w-[12rem] sm:max-w-[12rem] lg:max-w-[15rem] hidden md:flex font-black text-white">
      <FlexCol
        className={`space-y-4 p-5 pb-10 items-start ${
          currentImageState ? "h-[60vh]" : "h-screen"
        } scrollbar-hide overflow-y-scroll`}
      >
        <ButtonsSidebar BtnText="Home" Icon={HomeIcon} />
        <ButtonsSidebar BtnText="Search" Icon={SearchIcon} />
        <ButtonsSidebar BtnText="Library" Icon={LibraryIcon} />
        <ButtonsSidebar BtnText="Create Playlist" Icon={PlusCircleIcon} />
        <ButtonsSidebar BtnText="Liked Songs" Icon={HeartIcon} />
        <ButtonsSidebar BtnText="Your Episodes" Icon={RssIcon} />

        <Hr tw="border-black" />
        {playlists.map((playlist) => (
          <Text
            onClick={() => setPlaylistId(playlist.id)}
            key={playlist.id}
            tw="cursor-pointer"
          >
            {playlist.name}
          </Text>
        ))}
      </FlexCol>
      <ImageWrapper
        onClick={() => setCurrentImageState(!currentImageState)}
        className="relative h-[40vh] z-50 group cursor-pointer"
      >
        <img
          className={`object-contain ${
            currentImageState ? "" : "scale-[0.1] hidden"
          } transition-transform duration-700 ease-linear
          before:content-[''] before:absolute before:w-12 before:h-12 before:bg-red-500 before:rounded-full
           before:blur before:left-0 before:top-0 before:animate-pulse
          `}
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <FlexRow className="absolute top-1 flex items-center justify-center w-full">
          <ChevronDoubleDownIcon className="w-5 hidden group-hover:inline text-white" />
        </FlexRow>
      </ImageWrapper>
    </FlexCol>
  );
}

export default Sidebar;
