/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRecoilState } from "recoil";
import { albumIdState } from "../../atoms/libraryAtom";

function Albums({ item, key }) {
  const [artistId, setArtistId] = useRecoilState(albumIdState);
  return (
    <div className="pl-10">
      <h1 className="text-4xl pb-10">Albums</h1>
      <div className="text-white flex flex-col items-start justify-center bg-[#191414] p-3 pb-10 w-fit rounded-lg">
        <img
          className="w-44 object-contain"
          src={item?.album?.images?.[0]?.url}
          alt=""
        />
        <div>
          {item?.album?.artists.map((artist) => (
            <p onClick={() => setArtistId(artist.id)} key={artist.id}>
              {artist.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Albums;
