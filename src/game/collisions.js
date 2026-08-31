import { respawn } from "./player";

import { onPlatformTouched } from "./platforms";

let platforms = {
    static: null,
    moving: null,
    kill: null,
    portals: null,
};

let colliders = {
    static: null,
    moving: null,
    kill: null,
    portals: null,
};

export function initCollisions(player, onPortalTouched) {
    platforms.static = this.physics.add.staticGroup();

    platforms.moving = this.physics.add.group();

    platforms.kill = this.physics.add.staticGroup();

    platforms.portals = this.physics.add.staticGroup();

    colliders.static = this.physics.add.collider(
        player,
        platforms.static
    );

    colliders.moving = this.physics.add.collider(
        player,
        platforms.moving,
        onPlatformTouched
    );

    colliders.kill = this.physics.add.collider(
        player,
        platforms.kill,
        respawn
    );

    colliders.portals = this.physics.add.collider(
        player,
        platforms.portals,
        onPortalTouched
    );
}

export function togglePlayerCollisions() {
    for (const collider of Object.values(colliders)) {
        collider.active = !collider.active;
    }
}

export function getPlayerCollisions() {
    return Object.values(colliders).every(
        collider => collider.active
    );
}

export function addStaticPlatform(x, y) {
    return platforms.static.create(
        x,
        y,
        "platform"
    );
}

export function addMovingPlatform(x, y) {
    return platforms.moving.create(
        x,
        y,
        "platform"
    );
}

export function addKillPlatform(x, y) {
    return platforms.kill.create(
        x,
        y,
        "killPlatform"
    );
}

export function addPortal(x, y, colour) {
    return platforms.portals.create(
        x,
        y,
        colour + "Portal"
    );
}
