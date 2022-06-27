/* eslint-disable @next/next/no-img-element */
import React from "react";
import { millisToMinutesAndSeconds } from "../time";

function Grid({ order, track }) {
  const playSong = () => {
    setCurrentTrackId(track?.track?.id || track?.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track?.track?.uri || track?.uri],
    });
  };
  return (
    <div onClick={playSong} className="cursor-pointer hover:bg-sky-500">
      <div className="flex items-center space-x-5 py-3 px-2">
        <p>{order}</p>
        <img
          className="h-10 w-10 cursor-pointer"
          src={
            track?.track?.album?.images?.[0]?.url ||
            track?.album?.images?.[0]?.url
          }
          alt=""
        />
        <p>{track?.track?.name || track?.album?.name}</p>
      </div>
      <div>{track?.track?.album?.name || track?.album?.name}</div>
      <div>
        {track?.track?.album?.release_date || track?.album?.release_date}
      </div>
      <div>
        {millisToMinutesAndSeconds(
          track?.track?.duration_ms || track?.duration_ms
        )}
      </div>
    </div>
  );
}

export default Grid;
