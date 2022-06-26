/* eslint-disable @next/next/no-img-element */
import { Text } from "../styles/common.styles";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { ClockIcon } from "@heroicons/react/outline";

const heads = ["#", "TITLE", "ALBUM", "DATE RELEASED", "DURATION"];

function Table({ track, order }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };
  return (
    <tr
      onClick={playSong}
      className="cursor-pointer hover:bg-gray-900 rounded-3xl"
    >
      <td className="flex items-center space-x-5 py-3 px-2">
        <p>{order}</p>
        <img
          className="h-10 w-10 cursor-pointer"
          src={track?.track?.album?.images?.[0]?.url}
          alt=""
        />
        <p>{track.track.name}</p>
      </td>

      <td>{track.track.album.name}</td>
      <td>{track.track.album.release_date}</td>
      <td>{millisToMinutesAndSeconds(track.track.duration_ms)}</td>
    </tr>
  );
}

export default Table;
