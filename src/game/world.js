const worldWidth = 3600;
const worldHeight = 12000;

let scene

export function initWorld(player) {
  player.body.setCollideWorldBounds(true);
  this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
  this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
  this.cameras.main.startFollow(player);
  this.cameras.main.setZoom(0.6);

  scene = this
}

export function getScene() {
  return scene
}