import { SearchIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { searchState } from "../atoms/sidebarAtom";
import useSpotify from "../hooks/useSpotify";
import Table from "../components/Table";
import SearchResults from "../components/SearchResults";
import { albumIdState } from "../atoms/browseAtom";

function Search() {
  const [search, setSearch] = useRecoilState(searchState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [albumId, setAlbumIdState] = useRecoilState(albumIdState);

  const spotifyApi = useSpotify();

  const getTracks = async () => {
    spotifyApi
      .searchTracks(search)
      .then((res) => setPlaylist(res.body))
      .then(console.log(playlist))
      .catch((err) => console.error(err));
  };
  console.log(playlist);
  return (
    <div className="flex flex-col items-center pt-44 relative text-white h-screen overflow-scroll pb-44">
      <div className="flex items-center justify-center w-full">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          value={search}
          name="search"
          placeholder="Search"
          className="py-2 px-2 rounded-lg w-3/4 bg-[#1DB954] text-black font-black focus:outline-none placeholder:text-black"
        />
        <button onClick={getTracks} className="">
          <SearchIcon className="w-5" />
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {playlist?.tracks?.items.map((track, i) => (
          <div className="p-2" key={track?.track?.id}>
            <SearchResults order={i} track={track} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
