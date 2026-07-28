const speed = 400;
const jump = 650;

const startX = 2835 - 150;
const startY = (1453/2);

let cursors
let player

let heldKeys = {}

export function initPlayer() {
  player = this.physics.add.sprite(startX, startY, "player");
  player.setDisplaySize(40, 40);

  cursors = this.input.keyboard.createCursorKeys();

  return player;
}

export function respawn() {
  player.setPosition(startX, startY);
}

export function moveUp() {
  if (player.body.blocked.down) {
    player.body.setVelocityY(-jump);
  }
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

export function holdKey(key) {
  heldKeys[key] = true
}

export function stopKey(key) {
  heldKeys[key] = false
}

function isHeld(key) {
  return heldKeys[key]
}

export function updatePlayer() {
  if (cursors.left.isDown || isHeld("left")) {
    moveLeft()

  } else if (cursors.right.isDown || isHeld("right")) {
    moveRight()

  } else {
    stopPlayer()
  }

  if (cursors.up.isDown || isHeld("up")) {
    moveUp()
  }
}
