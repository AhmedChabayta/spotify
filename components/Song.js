/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

function Song({ order, track, color }) {
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
  console.log(track);
  return (
    <>
      <div className="">
        <p>{order}</p>
      </div>
      <div className="flex">
        <img
          className="h-10 w-10 cursor-pointer"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div className="flex flex-col">
          <p>{track.track.name} </p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>
    </>
  );
}

export default Song;
