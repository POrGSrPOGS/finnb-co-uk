import Confirmation from "../components/Confirmation";
import { respawn } from "./player";

let debounce = false

export function teleport(params) {
    if (debounce) return
    debounce = true

    console.log(params)
    window.open("https://porgsrpogs.hackclub.app", "_blank");
    respawn()

    debounce = false
}