/* eslint-disable @next/next/no-img-element */
import { playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import Song from "./Song";
import Table from "./Table";
import {
  ClockIcon,
  PlayIcon,
  HeartIcon,
  ArrowCircleDownIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { millisToMinutesAndSeconds } from "../time";
import { albumIdState, albumState } from "../atoms/browseAtom";
import useSpotify from "../hooks/useSpotify";
import { useEffect } from "react";

function AlbumTracks() {
  const [album, setAlbum] = useRecoilState(albumState);
  const [albumId, setAlbumIdState] = useRecoilState(albumIdState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    spotifyApi
      .getAlbum(albumId)
      .then((res) => setAlbum(res?.body))
      .catch((error) => console.error(error));
  }, [albumId, setAlbum, spotifyApi]);
  console.log(album);
  return (
    <div
      className="flex flex-col items-start w-screen
     bg-gradient-to-b from-gray-900/50 to-black/50 py-3 px-4 h-screen pb-44 overflow-scroll"
    >
      <div className="flex space-x-10">
        <span>
          <img className="w-52" src={album?.images?.[0]?.url} alt="" />
        </span>
        <div>
          <p className="text-5xl">{album?.name}</p>
        </div>
      </div>
      <div className="flex space-x-4 text-green-500">
        <PlayIcon
          className="relative w-20 before:absolute before:content-['']
         before:bg-black before:w-5 before:h-5 before:top-0 before:left-0"
        />
        <HeartIcon className="w-10" />
        <ArrowCircleDownIcon className="w-10" />
        <DotsHorizontalIcon className="w-7" />
      </div>
      <div className="flex justify-center">
        <table className="table-fixed w-full mx-auto">
          <thead className="border-b-[2px] border-gray-500/50 relative mx-auto">
            <tr className="">
              <th className="flex text-left space-x-2">
                <p>#</p>
                <p>TITLE</p>
              </th>
              <th className="text-left">ALBUM</th>
              <th className="text-left">YEAR RELEASED</th>
              <th className="text-left">
                <ClockIcon className="w-5" />
              </th>
            </tr>
          </thead>
          {album?.tracks?.items?.map((track, i) => (
            <tbody key={track?.track?.id}>
              <Table
                order={i}
                track={track}
                album={album}
                images={album?.images}
              />
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
export default AlbumTracks;
