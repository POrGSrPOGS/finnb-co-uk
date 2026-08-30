import Phaser from "phaser";

let keys = {};

export function initKeys() {
    const cursors = this.input.keyboard.createCursorKeys();
    const wasd = this.input.keyboard.addKeys("W,A,S,D");
    const space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    keys.cursors = cursors;
    keys.wasd = wasd;
    keys.space = space
    keys.held = {};
}

export function holdKey(key) {
    keys.held[key] = true;
}

export function stopKey(key) {
    keys.held[key] = false;
}

export function isHeld(key) {
    return keys.held[key] ?? false;
}

export function isUpHeld() {
    return keys.cursors.up.isDown ||
           keys.wasd.W.isDown ||
           keys.space.isDown ||
           isHeld("up");
}

export function isDownHeld() {
    return keys.cursors.down.isDown ||
           keys.wasd.S.isDown ||
           isHeld("down");
}

export function isLeftHeld() {
    return keys.cursors.left.isDown ||
           keys.wasd.A.isDown ||
           isHeld("left");
}

export function isRightHeld() {
    return keys.cursors.right.isDown ||
           keys.wasd.D.isDown ||
           isHeld("right");
}