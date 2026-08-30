import { getPlayerCollisions } from "./collisions";
import {
    isUpHeld,
    isLeftHeld,
    isRightHeld
} from "./keys";

const speed = 400;
const jump = 650;

const startX = 2835 - 150;
const startY = 1453 / 2;

let player;

export function initPlayer() {
  player = this.physics.add.sprite(startX, startY, "player");
  player.setDisplaySize(40, 40);

  return player;
}

export function respawn() {
  player.setPosition(startX, startY);
}

export function moveUp(multiplier = 1) {
  player.body.setVelocityY(-jump * multiplier);
}

export function moveLeft() {
  player.body.setVelocityX(-speed);
}

export function moveRight() {
  player.body.setVelocityX(speed);
}

export function stopPlayer() {
  player.body.setVelocityX(0);
}

export function updatePlayer() {
  if (isLeftHeld()) {
    moveLeft();
  } else if (isRightHeld()) {
    moveRight();
  } else {
    stopPlayer();
  }

  const canJump = player.body.blocked.down || !getPlayerCollisions();

  if (isUpHeld() && canJump) {
    moveUp();
  }
}

export function getMoves() {
  if (!player) return true;

  return player.body.moves;
}

export function toggleMoves() {
  player.body.moves = !getMoves();
}
