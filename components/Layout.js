/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import tw from "twin.macro";
import { playlistIdState } from "../atoms/playlistAtom";
import { FlexRow } from "../styles/common.styles";
import Player from "./Player";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const [fromColor, setFromColor] = useState();
  const playlistId = useRecoilValue(playlistIdState);
  useEffect(() => {
    setFromColor(shuffle(fromColors).pop());
  }, [playlistId]);

  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <Head>
          <title>Spotify</title>
        </Head>
        <FlexRow>
          <FlexRow
            onClick={() => signOut()}
            tw="flex items-center space-x-3 rounded-full text-white bg-black/50 p-3 absolute right-5 top-5 cursor-pointer"
          >
            {session ? (
              <>
                <img
                  className="rounded-full h-10 w-10"
                  src={session?.user.image}
                  alt=""
                />
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className="h-5 w-5" />
              </>
            ) : (
              "Login"
            )}
          </FlexRow>
        </FlexRow>
        <main
          className={`flex justify-between text-white bg-gradient-to-b ${fromColor}`}
        >
          <Sidebar />
          <div className="w-screen">{children}</div>
        </main>
        <div className="fixed bottom-0 w-screen">
          <Player />
        </div>
      </div>
    </>
  );
};

export default Layout;

const fromColors = [
  "from-indigo-900",
  "from-blue-900",
  "from-green-900",
  "from-red-900",
  "from-pink-900",
  "from-purple-900",
  "from-fuchsia-900",
];
