import { respawn, getAllowGravity, toggleAllowGravity } from "./player";
import { onPlatformTouched } from "./platforms";

let staticPlatforms;
let movingPlatforms;
let killPlatforms;
let portals;

let staticCollider;
let movingCollider;
let killCollider;
let portalCollider;

export function initCollisions(player, onPortalTouched) {
    staticPlatforms = this.physics.add.staticGroup();
    movingPlatforms = this.physics.add.group();
    killPlatforms = this.physics.add.staticGroup();
    portals = this.physics.add.staticGroup();

    staticCollider = this.physics.add.collider(
        player,
        staticPlatforms
    );

    movingCollider = this.physics.add.collider(
        player,
        movingPlatforms,
        onPlatformTouched
    );

    killCollider = this.physics.add.collider(
        player,
        killPlatforms,
        respawn
    );

    portalCollider = this.physics.add.collider(
        player,
        portals,
        onPortalTouched
    );
}

export function togglePlayerCollisions() {
    staticCollider.active = !staticCollider.active;
    movingCollider.active = !movingCollider.active;
    killCollider.active = !killCollider.active;
    portalCollider.active = !portalCollider.active;
}

export function arePlayerCollisionsActive() {
    return staticCollider.active && movingCollider.active && killCollider.active && portalCollider.active
}

export function addStaticPlatform(x, y) {
    return staticPlatforms.create(x, y, "platform");
}

export function addMovingPlatform(x, y) {
    return movingPlatforms.create(x, y, "platform");
}

export function addKillPlatform(x, y) {
    return killPlatforms.create(x, y, "killPlatform");
}

export function addPortal(x, y, colour) {
    return portals.create(x, y, colour + "Portal");
}