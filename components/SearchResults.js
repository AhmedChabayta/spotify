import React from "react";
import { useRecoilState } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Result from "./Result";

function SearchResults() {
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  console.log(playlist);
  return <div className=""></div>;
}

export default SearchResults;
