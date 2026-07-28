import { respawn } from "./player";

let staticPlatforms
let movingPlatforms
let killPlatforms

export function initCollisions(player, onPlatformTouched) {
    staticPlatforms = this.physics.add.staticGroup();
    movingPlatforms = this.physics.add.group()
    killPlatforms = this.physics.add.staticGroup()

    this.physics.add.collider(player, staticPlatforms);
    this.physics.add.collider(player, movingPlatforms, onPlatformTouched)
    this.physics.add.collider(player, killPlatforms, respawn)
}

export function addStaticPlatform(x, y) {
    return staticPlatforms.create(x, y, "platform")
}

export function addMovingPlatform(x, y) {
    return movingPlatforms.create(x , y, "platform")
}

export function addKillPlatform(x, y) {
    return killPlatforms.create(x, y, "killPlatform")
}