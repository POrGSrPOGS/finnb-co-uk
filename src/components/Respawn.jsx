import { respawn } from "../game/player";

export default function Respawn({}) {
  return (
    <button
      className="
  rounded-full
  bg-red-500/80
  px-4
  py-2
  text-sm
  font-medium
  text-white
  shadow-md
  backdrop-blur-sm
  transition
  hover:bg-red-500
  active:scale-95
  select-none
"
      onClick={() => {respawn(true)}}
    >
      Respawn
    </button>
  );
}
