import { useState } from "react";
import {
  togglePlayerCollisions,
  getPlayerCollisions,
} from "../game/collisions";

export default function Spectate({}) {
  const [spectatorMode, setSpectatorMode] = useState(false);

  return (
    <button
      className="
    rounded-full
    bg-blue-500/80
    px-4
    py-2
    text-sm
    font-medium
    text-white
    shadow-md
    backdrop-blur-sm
    transition
    hover:bg-blue-500
    active:scale-95
            "
      onClick={() => {
        togglePlayerCollisions();
        setSpectatorMode(!getPlayerCollisions());
      }}
    >
      {spectatorMode ? "Disable spectator mode" : "Spectator mode"}
    </button>
  );
}
