import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { albumIdState, albumState } from "../atoms/browseAtom";
import AlbumTracks from "../components/AlbumTracks";
import Songs from "../components/Songs";
import Table from "../components/Table";
import useSpotify from "../hooks/useSpotify";

function Albums() {
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
    <div>
      {album?.tracks?.items.map((track, i) => (
        <AlbumTracks key={i} track={track} />
      ))}
    </div>
  );
}

export default Albums;
