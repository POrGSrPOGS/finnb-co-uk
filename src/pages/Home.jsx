import { useEffect, useRef } from "react";
import Phaser from "phaser";
const worldWidth = 2835;
const worldHeight = 1453;
const startX = 100
const startY = 425

export default function Home() {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    let cursors;
    let player;
    let platform;

    function preload() {
      this.load.image("platform", "/platform.png");
      this.load.image("player", "/player.png");
      this.load.image("cloud", "/cloud.png")
    }

    function initWorld(player) {
      player.body.setCollideWorldBounds(true);
      this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
      this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
      this.cameras.main.startFollow(player);
    }

    function isCrushed(player) {
        return player.body.blocked.down
    }

    function respawn(player) {
        player.setPosition(startX, startY)
    }

    function onPlatformTouch() {
        if (isCrushed(player)) respawn(player)
        platform.body.setVelocityY(100);
    }

    function create() {

     const cloud = this.add.image(worldWidth / 2, worldHeight / 2, 'cloud')
     cloud.setDisplaySize(300,225)
     cloud.setPosition(2500, 250)
        
      const platforms = this.physics.add.staticGroup();
      const movingPlatforms = this.physics.add.group()
      
      platform = movingPlatforms.create(400, 500, "platform");
      platform.body.setAllowGravity(false);
      platform.setDisplaySize(400, 40);
      platform.body.setVelocityY(100);
      platform.body.immovable = true
    


      player = this.physics.add.sprite(startX, startY, "player");
      player.setDisplaySize(40, 40);

      initWorld.call(this, player);

      this.physics.add.collider(player, platforms);
      this.physics.add.collider(player, movingPlatforms)

      cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
      const speed = 200;
      const jump = 600;

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
      if (platform.y <= 100) {
        platform.body.setVelocityY(100);
      } else if (platform.y >= 1300) {
        platform.body.setVelocityY(-100);
      }
    }

    const config = {
      backgroundColor: "#c5eaff",
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      parent: gameContainerRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 600 },
          debug: false,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
    };

    const gameInstance = new Phaser.Game(config);

    return () => {
      gameInstance.destroy(true);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div ref={gameContainerRef} />
    </div>
  );
}
