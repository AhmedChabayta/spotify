/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { FlexCol, FlexRow, Text } from "../styles/common.styles";
import tw from "twin.macro";

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
      <FlexRow tw="items-center space-x-4 min-w-[34vw]">
        <FlexRow tw="flex items-center space-x-4">
          <Text tw="font-normal">{order}</Text>
          <img
            className="h-10 w-10 cursor-pointer"
            src={track?.track?.album?.images?.[0]?.url}
            alt=""
          />
        </FlexRow>
        <FlexCol tw="truncate">
          <Text>{track.track.name} </Text>
          <Text>{track.track.artists[0].name}</Text>
        </FlexCol>
      </FlexRow>
      {/*  end index artist name and song name */}
      <div className="flex items-center justify-left truncate min-w-[34vw]">
        <Text>{track.track.album.name}</Text>
      </div>
      <FlexRow tw=" items-center">
        <Text className="cursor-default min-w-[34vw] font-normal">
          {millisToMinutesAndSeconds(track.track.duration_ms)}
        </Text>
      </FlexRow>
    </div>
  );
}

export default Song;
