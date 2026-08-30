import { holdKey, stopKey } from "../game/keys";
import { useState } from "react";

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
  className="z-10 touch-none select-none"
  style={{ WebkitTouchCallout: "none" }}
  onMouseDown={onDown}
  onMouseUp={onUp}
  onMouseLeave={onLeave}
  onTouchStart={onDown}
  onTouchEnd={onUp}
  onContextMenu={(e) => e.preventDefault()}
>
  <img
    src={`/${direction}Arrow.png`}
    alt={direction}
    className={`${opacity} w-18 h-18 pointer-events-none`}
    draggable={false}
  />
</button>
  );
}
