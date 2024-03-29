/* eslint-disable @next/next/no-img-element */
import { Text } from "../styles/common.styles";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { ClockIcon } from "@heroicons/react/outline";
import { useState } from "react";

const heads = ["#", "TITLE", "ALBUM", "DATE RELEASED", "DURATION"];

function Table({ track, order, images, album }) {
  const [query, setQuery] = useState("");
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track?.track?.id || track?.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track?.track?.uri || track?.uri],
    });
  };
  return (
    <tr onClick={playSong} className="cursor-pointer hover:bg-sky-500">
      <td className="flex items-center space-x-5 py-3 px-2">
        <p>{order}</p>
        <img
          className="h-10 w-10 cursor-pointer"
          src={
            track?.track?.album?.images?.[0]?.url ||
            track?.album?.images?.[0]?.url ||
            images[0]?.url
          }
          alt=""
        />
        <p>{track?.track?.name || track?.album?.name || track?.name}</p>
      </td>
      <td>{track?.track?.album?.name || track?.album?.name || album?.name}</td>
      <td>
        {track?.track?.album?.release_date ||
          track?.album?.release_date ||
          album?.release_date}
      </td>
      <td>
        {millisToMinutesAndSeconds(
          track?.track?.duration_ms || track?.duration_ms
        )}
      </td>
    </tr>
  );
}

export default Table;
