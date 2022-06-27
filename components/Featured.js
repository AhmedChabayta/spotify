import {
  ArrowCircleDownIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PlayIcon,
} from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { featuredState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Grid from "./Grid";
import Table from "./Table";

function Featured() {
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();
  const [featured, setFeatured] = useRecoilState(featuredState);
  useEffect(() => {
    spotifyApi
      .getFeaturedPlaylists({
        limit: 3,
        offset: 0,
        country: "LB",
        locale: "lb_LB",
      })
      .then(() => setPlaylist())
      .then((res) => setFeatured(res.body))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi, setFeatured]);
  console.log(featured);
  return (
    <div
      className="flex flex-col space-x-2 w-screen
     bg-gradient-to-b from-gray-900/50 to-black/50 p-5 min-h-[100vh] pb-44"
    >
      <div className="flex items-center space-x-2 mt-10">
        {featured?.playlists?.items.map((items, i) => (
          <div
            className="overflow-hidden bg-[#191414] hover:bg-gray-700 w-44 p-5 rounded-lg"
            key={i}
          >
            <img
              className="w-44 rounded-lg"
              src={items.images?.[0]?.url}
              alt=""
            />
            <h2 className="text-xs truncate overflow-clip text-gray-300">
              {items?.description}
            </h2>
            <p className="text-xs">{featured?.playlists?.total} TRACKS</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured;
