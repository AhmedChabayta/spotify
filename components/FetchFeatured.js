import { LibraryIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { featuredState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function FetchFeatured() {
  const spotifyApi = useSpotify();
  const [featured, setFeatured] = useRecoilState(featuredState);

  return (
    <button className="flex space-x-2 items-center">
      <LibraryIcon className="w-5" />
      <p>Library</p>
    </button>
  );
}

export default FetchFeatured;
