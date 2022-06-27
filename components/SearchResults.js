/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import { albumIdState } from "../atoms/browseAtom";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../time";

function SearchResults({ track, order }) {
  const [albumId, setAlbumIdState] = useRecoilState(albumIdState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const spotifyApi = useSpotify();
  const playSong = () => {
    setCurrentTrackId(track?.track?.id || track?.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track?.track?.uri || track?.uri],
    });
  };
  console.log(albumId);
  return (
    <Link href="/albums">
      <div
        onClick={playSong}
        className="flex flex-col bg-[#191414] w-[15vw] overflow-clip rounded-lg"
      >
        <div className="flex flex-col items-center space-x-5 py-3 px-2">
          <span onClick={() => setAlbumIdState(track?.album?.id)} className="">
            <img
              className="cursor-pointer rounded-lg"
              src={
                track?.track?.album?.images?.[0]?.url ||
                track?.album?.images?.[0]?.url
              }
              alt=""
            />
          </span>
          <p className="self-start text-sm whitespace-pre-wrap truncate pt-5">
            {track?.track?.name || track?.album?.name}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SearchResults;
