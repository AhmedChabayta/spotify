import React from "react";
import { playlistState } from "../atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import Song from "./Song";

function Songs({ color }) {
  const playlist = useRecoilValue(playlistState);
  return (
    <table className="table-auto">
      <thead className="">
        <tr className="">
          <th>#</th>
          <th>Title</th>
          <th>Album</th>
          <th>Date Added</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody className="px-8 flex flex-col pb-28 text-white">
        {playlist?.tracks.items.map((track, i) => (
          <tr key={track.track.id}>
            <td className="flex items-center space-x-4">
              <Song color={color} track={track} order={i} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Songs;
