import { respawn } from "./player";

export function teleport(url) {
    if (debounce) return
    if (!url) return

    debounce = true

    window.open(url, "_blank");
    respawn(true)


    debounce = false
}