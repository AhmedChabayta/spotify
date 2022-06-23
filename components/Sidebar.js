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
  return (
    <div className="flex-col text-xs lg:text-sm min-w-[12rem] sm:max-w-[12rem] lg:max-w-[15rem] hidden md:flex font-black text-white">
      <div
        className={`flex flex-col space-y-4 p-5 items-start ${
          currentImageState ? "h-[60vh]" : "h-screen"
        } scrollbar-hide overflow-y-scroll`}
      >
        <button
          className="flex space-x-2 items-center"
          onClick={() => signOut()}
        >
          <CogIcon className="h-5 w-5" />
          <p> Log Out</p>
        </button>
        <ButtonsSidebar BtnText="Home" Icon={HomeIcon} />
        <ButtonsSidebar BtnText="Search" Icon={SearchIcon} />
        <ButtonsSidebar BtnText="Library" Icon={LibraryIcon} />
        <hr className="border-t-[0.1px] border-gray-900" />
        <ButtonsSidebar BtnText="Create Playlist" Icon={PlusCircleIcon} />
        <ButtonsSidebar BtnText="Liked Songs" Icon={HeartIcon} />
        <ButtonsSidebar BtnText="Your Episodes" Icon={RssIcon} />
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.map((playlist) => (
          <p
            onClick={() => setPlaylistId(playlist.id)}
            key={playlist.id}
            className="cursor-pointer"
          >
            {playlist.name}
          </p>
        ))}
      </div>
      <div
        onClick={() => setCurrentImageState(!currentImageState)}
        className="relative h-[40vh] z-50 group cursor-pointer"
      >
        <img
          className={`object-contain  ${
            currentImageState ? "" : "hidden"
          } transition-transform duration-150`}
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div className="absolute top-1 flex items-center justify-center w-full">
          <ChevronDoubleDownIcon className="w-5 hidden group-hover:inline text-white" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
