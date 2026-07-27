import { useEffect, useRef } from "react";
import Phaser from "phaser";

import { initWorld } from "../game/world";
import { initPlayer, updatePlayer } from "../game/player";
import { initCollisions } from "../game/collisions";
import {
  createStaticPlatform,
  createLinearPlatform,
  createCircularPlatform,
  updatePlatforms,
  onPlatformTouched,
} from "../game/platforms";

export default function Home() {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    let cursors;
    let player;

    function preload() {
      this.load.image("platform", "/platform.png");
      this.load.image("player", "/player.png");
      this.load.image("cloud", "/cloud.png");
    }

    function create() {
      const cloud = this.add.image(2500, 250, "cloud");
      cloud.setDisplaySize(300, 225);

      player = initPlayer.call(this);
      initWorld.call(this, player);
      initCollisions.call(this, player, onPlatformTouched);

      createLinearPlatform({
        axisConstant: 400,
        width: 400,
        height: 40,
        axis: "Y",
        start: 100,
        end: 1300,
        velocity: 300,
      });
      createCircularPlatform({
        width: 128,
        height: 32,
        centreX: 1600,
        centreY: 500,
        radius: 300,
        velocity: 100,
        angle: 0,
      });
      createCircularPlatform({
        width: 128,
        height: 32,
        centreX: 1600,
        centreY: 500,
        radius: 300,
        velocity: 100,
        angle: 90,
      });
      createCircularPlatform({
        width: 128,
        height: 32,
        centreX: 1600,
        centreY: 500,
        radius: 300,
        velocity: 100,
        angle: 180,
      });
            createCircularPlatform({
        width: 128,
        height: 32,
        centreX: 1600,
        centreY: 500,
        radius: 300,
        velocity: 100,
        angle: 270,
      });
    }

    function update(time, delta) {
      updatePlayer(player, cursors);
      updatePlatforms(time, delta);
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
