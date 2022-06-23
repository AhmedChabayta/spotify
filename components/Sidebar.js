import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ButtonsSidebar from "./ButtonsSidebar";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  return (
    <div
      className="text-gray-500 p-5 text-xs lg:text-sm border-r  border-gray-900
     overflow-y-scroll h-screen scrollbar-hide min-w-[12rem] sm:max-w-[12rem] lg:max-w-[15rem]
     hidden md:inline-flex pb-36
     "
    >
      <div className="space-y-4">
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
            className="hover:text-white cursor-pointer"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
