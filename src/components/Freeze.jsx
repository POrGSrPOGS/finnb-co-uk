import { useState } from "react";
import { getMoves, toggleMoves } from "../game/player";

export default function Freeze({}) {
  const [playerFrozen, setPlayerFrozen] = useState(false);

  return (
    <button
      className="
    rounded-full
    bg-blue-200/80
    px-4
    py-2
    text-sm
    font-medium
    text-black
    shadow-md
    backdrop-blur-sm
    transition
    hover:bg-blue-100
    active:scale-95
    select-none
  "
      onClick={() => {
        toggleMoves();
        setPlayerFrozen(!getMoves());
      }}
    >
      {playerFrozen ? "Unfreeze" : "Freeze"}
    </button>
  );
}
