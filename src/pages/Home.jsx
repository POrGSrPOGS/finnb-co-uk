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
  createLabel,
} from "../game/platforms";

function createPlatformRing(config) {
  const { x, y, width, height, stringsDescription, strings } = config;

  const angleInterval = 360 / strings.length;

  createStaticPlatform({
    x,
    y,

    // Make centre platform slightly smaller
    width: width * 0.8,
    height: height * 0.8,
    text: stringsDescription,
  });

  strings.forEach((string, index) => {
    createCircularPlatform({
      width,
      height,
      centreX: x,
      centreY: y,
      radius: 500,
      velocity: 75,
      angle: angleInterval * index,
      text: string,
    });
  });
}

export default function Home() {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    let cursors;
    let player;

    function preload() {
      this.load.image("platform", "/platform.png");
      this.load.image("player", "/player.png");
      this.load.image("scratch", "/scratch.png");
      this.load.image("roblox", "/roblox.png");
    }

    function create() {
      player = initPlayer.call(this);
      initWorld.call(this, player);
      initCollisions.call(this, player, onPlatformTouched);

      createLabel({
        text: "I'm Finn Brierley, an aspiring software engineer",
        x: 2200,
        y: 1000,
        fontSize: 60,
        colour: "#02beb5",
      });

      createLabel({
        text: "Here is where I began, where I am now, and the projects I've made along the way",
        x: 1200,
        y: 1100,
        fontSize: 50,
        colour: "#44bdb7",
      });

      createStaticPlatform({
        x: 2000,
        y: 1350,
        width: 3200,
        height: 60,
      });

      createLinearPlatform({
        axis: "y",
        axisConstant: 200,
        width: 380,
        height: 150,
        start: 1400,
        end: 2050,
        text: "I've always had a love for designing and creating",
        velocity: 150,
      });

      createStaticPlatform({
        x: 725,
        y: 2000,
        width: 650,
        height: 120,
        text: "At 10 years old I started creating games on Scratch",
      });

      const scratch = this.add.image(725, 1850, "scratch");
      scratch.setDisplaySize(200, 200);
      scratch.setAlpha(0.5); // 50% Transparency

      createStaticPlatform({
        x: 725 + 650,
        y: 2300,
        width: 650,
        height: 120,
        text: "By 12 I was coding games in Roblox by modifying open source code",
      });

      const roblox = this.add.image(725 + 650, 2125, "roblox");
      roblox.setDisplaySize(180, 180);
      roblox.setAlpha(0.5); // 50% Transparency

      createStaticPlatform({
        x: 725 + 1300,
        y: 2600,
        width: 650,
        height: 120,
        text: "And at just 13 I was coding games in Roblox without any external code",
      });

      const projectTypes = [
        "Lua",
        "Python",
        "JavaScript",
        "Websites",
        "Games",
        "Utilities",
      ];

      createPlatformRing({
        x: 2835 / 2,
        y: 3250,
        width: 300,
        height: 100,
        stringsDescription: "What I Code",
        strings: projectTypes,
      });

      const codeSkills = [
        "Modular",
        "Flexible",
        "Configurable",
        "Expandable"
      ]

      createPlatformRing({
        x: 2835 / 2,
        y: 4500,
        width: 300,
        height: 100,
        stringsDescription: "How I Code",
        strings: codeSkills,
      });
    }

    function update(time, delta) {
      updatePlayer(player, cursors);
      updatePlatforms(time, delta);
    }

    const config = {
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
    <div className="flex items-center justify-center h-screen">
      <div ref={gameContainerRef} />
    </div>
  );
}
