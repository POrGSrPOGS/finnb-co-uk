import { respawn } from "./player";

let debounce = false

export function teleport(url) {
    if (debounce) return
    if (!url) return

    debounce = true

    window.open(url, "_blank");
    //respawn()


    debounce = false
}