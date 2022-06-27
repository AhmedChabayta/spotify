import { LibraryIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { featuredState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function FetchFeatured() {
  const spotifyApi = useSpotify();
  const [featured, setFeatured] = useRecoilState(featuredState);

  useEffect(() => {
    if (featured?.length === undefined) {
      spotifyApi
        .getFeaturedPlaylists({
          limit: 3,
          offset: 1,
          country: "US",
          locale: "en_US",
          timestamp: "2014-10-23T09:00:00",
        })
        .then((res) => setFeatured(res.body))
        .catch((err) => console.error(err));
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi, setFeatured]);
  return (
    <button className="flex space-x-2 items-center">
      <LibraryIcon className="w-5" />
      <p>Library</p>
    </button>
  );
}

export default FetchFeatured;
