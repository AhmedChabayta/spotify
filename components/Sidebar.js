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
    <div
      className="border-r-[2x] border-gray-500 h-screen justify-between
     text-xs lg:text-sm min-w-[12rem] sm:max-w-[12rem] lg:max-w-[15rem] hidden md:flex flex-col text-white bg-black"
    >
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
      <span
        onClick={() => setCurrentImageState(!currentImageState)}
        className="flex items-end relative group cursor-pointer pb-20"
      >
        <img
          className={`object-contain ${
            currentImageState ? "" : "scale-[0.1] hidden"
          } transition-transform duration-700 ease-linear`}
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
      </span>
    </div>
  );
}

export default Sidebar;
{
  /* <FlexRow className="absolute top-1 flex items-center justify-center w-full">
  <ChevronDoubleDownIcon className="w-5 hidden group-hover:inline text-white" />
</FlexRow>; */
}
