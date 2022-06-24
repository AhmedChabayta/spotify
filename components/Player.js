/* eslint-disable @next/next/no-img-element */
import {
  FastForwardIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  PlayIcon,
  ReplyIcon,
  PauseIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import {
  ChevronDoubleUpIcon,
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import { debounce, shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { imageState } from "../atoms/sidebarAtom";
import {
  FlexCol,
  FlexRow,
  Grid,
  ImageWrapper,
  Text,
} from "../styles/common.styles";
import tw from "twin.macro";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(100);

  const [currentImageState, setCurrentImageState] = useRecoilState(imageState);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now Playing", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };
  const playlistId = useRecoilValue(playlistIdState);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(100);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 400),
    []
  );
  return (
    <Grid
      tw="relative h-20 font-bold text-white hover:bg-white hover:text-black transition-colors duration-150 
      grid-cols-3 text-xs md:text-base px-2 md:px-8"
    >
      <FlexRow className="flex items-center space-x-4 ">
        <ImageWrapper
          onClick={() => setCurrentImageState(!currentImageState)}
          className="group relative"
        >
          <img
            className={`w-14 object-contain ${
              currentImageState ? "hidden" : "inline"
            } cursor-pointer relative`}
            src={songInfo?.album.images?.[0]?.url}
            alt=""
          />
          <ChevronDoubleUpIcon className="w-5 absolute top-0 left-3 invisible group-hover:visible" />
        </ImageWrapper>
        <FlexCol>
          <h3 className="underline truncate max-w-xs">{songInfo?.name}</h3>
          <Text tw="font-semibold">{songInfo?.artists?.[0]?.name}</Text>
        </FlexCol>
      </FlexRow>
      <FlexRow
        className="relative items-center justify-evenly
      before:content-[''] before:absolute before:w-12 before:h-12 before:bg-gradient-to-b before:from-blue-500 before:rounded-full before:blur before:left-50 before:top-5 before:animate-pulse"
      >
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="button"
        />
        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="button h-10 w-10 z-50 relative"
          />
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className="button h-10 w-10 z-50 relative"
          />
        )}
        <FastForwardIcon
          onClick={() => spotifyApi.skipToNext()}
          className="button"
        />
        <ReplyIcon className="button" />
      </FlexRow>
      <FlexRow className="flex items-center space-x-3 md:space-x-4 justify-end">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          mnin={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </FlexRow>
    </Grid>
  );
}

export default Player;
