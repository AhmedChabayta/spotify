/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

function Song({ order, track }) {
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
    <div
      onClick={playSong}
      className={`flex cursor-pointer hover:bg-black/20 group py-4 px-5
       hover:rounded-lg whitespace-nowrap min-w-[33vw] font-bold space-x-5`}
    >
      {/* index artist name and song name */}
      <div className="flex items-center space-x-4 min-w-[34vw]">
        <div className="flex items-center space-x-4">
          <p className="font-normal">{order}</p>
          <img
            className="h-10 w-10 cursor-pointer"
            src={track?.track?.album?.images?.[0]?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col truncate">
          <p>{track.track.name} </p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>
      {/*  end index artist name and song name */}
      <div className="flex items-center justify-left truncate min-w-[34vw]">
        <p>{track.track.album.name}</p>
      </div>
      <div className="flex items-center">
        <p className="cursor-default min-w-[34vw] font-normal">
          {millisToMinutesAndSeconds(track.track.duration_ms)}
        </p>
      </div>
    </div>
  );
}

export default Song;
