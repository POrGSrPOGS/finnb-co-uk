let staticPlatforms
let movingPlatforms

export function initCollisions(player, onPlatformTouched) {
    staticPlatforms = this.physics.add.staticGroup();
    movingPlatforms = this.physics.add.group()

    this.physics.add.collider(player, staticPlatforms);
    this.physics.add.collider(player, movingPlatforms, onPlatformTouched)
}

export function addStaticPlatform(x, y) {
    return staticPlatforms.create(x, y, "platform")
}

export function addMovingPlatform(x, y) {
    return movingPlatforms.create(x , y, "platform")
}