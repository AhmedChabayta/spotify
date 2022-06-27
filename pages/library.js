import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import Albums from "../components/Library/Albums";
import { useRecoilState } from "recoil";
import { albumIdState, albumState } from "../atoms/libraryAtom";
import Artists from "../components/Library/Artists";

function Library() {
  const spotifyApi = useSpotify();
  const [album, setAlbum] = useRecoilState(albumState);

  useEffect(() => {
    spotifyApi
      .getMySavedAlbums({
        limit: 4,
        offset: 0,
      })
      .then((res) => setAlbum(res.body))
      .catch((err) => console.error(err));
  }, [spotifyApi]);
  console.log(album);
  return (
    <div>
      <>
        {album?.items?.map((item, i) => (
          <Albums key={i} item={item} />
        ))}
      </>
      <>
        <Artists />
      </>
    </div>
  );
}

export default Library;
