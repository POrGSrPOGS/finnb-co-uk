import { holdKey, stopKey } from "../game/player";
import { useEffect, useState } from "react";

export default function ArrowKey({ direction }) {
    const [isHeld, setHeld] = useState(false);

    const opacity = isHeld ? "opacity-25" : "opacity-50"

    function onDown() {
        holdKey(direction)
        setHeld(true)
    }

    function onUp() {
        stopKey(direction)
        setHeld(false)
    }

    function onLeave() {
        if (isHeld) {
            onUp()
        }
    }

  return (
    <button
      className="z-10"
      onMouseDown={onDown}
      onMouseUp={onUp}
      onMouseLeave={onLeave}
      onTouchStart={onDown}
      onTouchEnd={onUp}
    >
      <img src={`/${direction}Arrow.png`} alt={direction} className={`${opacity} w-18 h-18 select-none pointer-events-none`} draggable={false}/>
    </button>
  );
}
