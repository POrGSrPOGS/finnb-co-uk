const speed = 400;
const jump = 800;

const startX = 2835 - 150;
const startY = (1453/2);

let cursors
let player

export function initPlayer() {
  player = this.physics.add.sprite(startX, startY, "player");
  player.setDisplaySize(40, 40);

  cursors = this.input.keyboard.createCursorKeys();

  return player;
}

export function respawn() {
  player.setPosition(startX, startY);
}

export function updatePlayer() {
  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  } else {
    player.body.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.blocked.down) {
    player.body.setVelocityY(-jump);
  }
}
