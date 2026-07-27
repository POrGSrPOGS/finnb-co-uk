const worldWidth = 2835;
const worldHeight = 1453;

export function initWorld(player) {
  player.body.setCollideWorldBounds(true);
  this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
  this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
  this.cameras.main.startFollow(player);
}
