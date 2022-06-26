import { SearchIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import { searchState } from "../atoms/sidebarAtom";
import useSpotify from "../hooks/useSpotify";

function Search() {
  const [search, setSearch] = useRecoilState(searchState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  const getTracks = async () => {
    if (search?.length >= 5) {
      spotifyApi
        .searchTracks(search)
        .then((res) => setPlaylist(res.body))
        .catch((err) => console.error(err));
    } else {
      return;
    }
  };
  return (
    <div className="flex relative text-white">
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        value={search}
        name="search"
        placeholder="Search"
        className="p-1 bg-black"
      />
      <button onClick={getTracks} className="">
        <SearchIcon className="w-5" />
      </button>
    </div>
  );
}

export default Search;
