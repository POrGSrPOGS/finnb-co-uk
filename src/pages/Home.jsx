import { useEffect, useRef, useState } from "react";

import Phaser from "phaser";

import { initWorld } from "../game/world";

import { initPlayer, updatePlayer } from "../game/player";

import { initKeys } from "../game/keys";

import Freeze from "../components/Freeze";

import Respawn from "../components/Respawn";

import Spectate from "../components/Spectate";

import { initCollisions } from "../game/collisions";

import {
  createStaticPlatform,
  createKillPlatform,
  createLinearPlatform,
  createPlatformRing,
  updatePlatforms,
  createLabel,
  createPortal,
} from "../game/platforms";

import ArrowKey from "../components/ArrowKey";

import Confirmation from "../components/Confirmation";

export default function Home() {
  const gameContainerRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [portalOptions, setPortalOptions] = useState({});

  function onPortalTouched(player, portal) {
    setPortalOptions(portal.getData("options") || {});
    setShowConfirmation(true);
  }

  useEffect(() => {
    let cursors;
    let player;

    function preload() {
      this.load.image("platform", "/platform.png");
      this.load.image("player", "/player.png");
      this.load.image("scratch", "/scratch.png");
      this.load.image("roblox", "/roblox.png");
      this.load.image("killPlatform", "/killPlatform.png");
      this.load.image("redPortal", "/redPortalBlue.png");
    }

    function create() {
      // =========================================================
      // INITIALISE GAME
      // =========================================================

      player = initPlayer.call(this);
      initWorld.call(this, player);
      initCollisions.call(this, player, onPortalTouched);
      initKeys.call(this);

      // =========================================================
      // INTRODUCTION
      // =========================================================

      createLabel({
        text: "I'm Finn Brierley, an aspiring software engineer",
        x: 2200,
        y: 1800,
        fontSize: 60,
        colour: "#02beb5",
      });

      createLabel({
        text: "<- Explore my journey",
        x: 1900,
        y: 2100,
        fontSize: 50,
        colour: "#32f142",
      });

      createLabel({
        text: "Here is where I began, where I am now, and the projects I've made along the way",
        x: 1200,
        y: 2000,
        fontSize: 50,
        colour: "#44bdb7",
      });

      createStaticPlatform({
        x: 2200,
        y: 2350,
        width: 3200,
        height: 80,
      });

      createLinearPlatform({
        axis: "y",
        axisConstant: 250,
        width: 450,
        height: 180,
        start: 2400,
        end: 3000,
        text: "I've always had a love for designing and creating",
        velocity: 150,
      });

      // =========================================================
      // PROGRAMMING JOURNEY
      // =========================================================

      createLabel({
        text: "MY JOURNEY",
        x: 800,
        y: 2650,
        fontSize: 50,
        colour: "#00ffff",
      });

      // ---------------------------------------------------------
      // SCRATCH
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 800,
        y: 3000,
        width: 550,
        height: 200,
        text: "At 10 years old I started creating games on Scratch",
      });

      const scratch = this.add.image(800, 2800, "scratch");
      scratch.setDisplaySize(200, 200);
      scratch.setAlpha(0.5);

      // ---------------------------------------------------------
      // ROBLOX
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 1425,
        y: 3350,
        width: 750,
        height: 220,
        text: "By 12 I was coding games in Roblox by modifying open source code",
      });

      const roblox = this.add.image(1425, 3130, "roblox");
      roblox.setDisplaySize(180, 180);
      roblox.setAlpha(0.5);

      // ---------------------------------------------------------
      // ROBLOX FROM SCRATCH
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 2175,
        y: 3700,
        width: 750,
        height: 220,
        text: "At 13 I started building entire Roblox games from scratch",
      });

      // ---------------------------------------------------------
      // WEB DEVELOPMENT
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 2925,
        y: 4050,
        width: 750,
        height: 220,
        text: "I eventually moved into Python, JavaScript and web development",
      });

      // ---------------------------------------------------------
      // CURRENT DEVELOPMENT
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 2175,
        y: 4400,
        width: 750,
        height: 250,
        text: "Now I'm building larger software projects and experimenting with machine learning",
      });

      // =========================================================
      // WHAT I CODE
      // =========================================================

      createPlatformRing({
        x: 1000,
        y: 4950,
        width: 400,
        height: 200,
        stringsDescription: "What I Code",
        strings: [
          "JavaScript",
          "Python",
          "Lua",
          "React",
          "Node.js",
          "Games",
          "Websites",
          "Utilities",
        ],
      });

      // =========================================================
      // PROJECTS
      // =========================================================

      createLabel({
        text: "PAST PROJECTS",
        x: 1417,
        y: 5750,
        fontSize: 60,
        colour: "#00ffff",
      });

      createLabel({
        text: "Walk into a portal to explore one of my projects",
        x: 1417,
        y: 5870,
        fontSize: 40,
        colour: "#88ffff",
      });

      // =========================================================
      // AI REVISION WEBSITE
      // =========================================================

      createPortal({
        x: 400,
        y: 6300,
        colour: "red",
        options: {
          demoURL: "https://porgsrpogs.hackclub.app",
          codeURL: "https://github.com/POrGSrPOGS/ai-revision-website",
          name: "AI Revision Website",
        },
      });

      createStaticPlatform({
        x: 400,
        y: 6600,
        width: 1400,
        height: 150,
        text: "AI Revision Website",
      });

      createLabel({
        text: "AI REVISION",
        x: 400,
        y: 6100,
        fontSize: 40,
        colour: "#ff5555",
      });

      // =========================================================
      // THIS PORTFOLIO
      // =========================================================

      createPortal({
        x: 1900,
        y: 6300,
        colour: "red",
        options: {
          demoURL: window.location.href,
          codeURL: "https://github.com/POrGSrPOGS/finnb-co-uk",
          name: "This Portfolio",
        },
      });

      createStaticPlatform({
        x: 1900,
        y: 6600,
        width: 1400,
        height: 150,
        text: "This Portfolio",
      });

      createLabel({
        text: "THIS SITE",
        x: 1900,
        y: 6100,
        fontSize: 40,
        colour: "#ff5555",
      });

      // =========================================================
      // FUTURE PROJECT
      // =========================================================

      createStaticPlatform({
        x: 3000,
        y: 6300,
        width: 600,
        height: 150,
        text: "More projects coming soon...",
      });

      createLabel({
        text: "COMING SOON",
        x: 3000,
        y: 6100,
        fontSize: 40,
        colour: "#32f142",
      });

      // =========================================================
      // TECHNICAL SKILLS
      // =========================================================

      createLabel({
        text: "TECHNICAL SKILLS",
        x: 1417,
        y: 7200,
        fontSize: 60,
        colour: "#00ffff",
      });

      createStaticPlatform({
        x: 500,
        y: 7550,
        width: 650,
        height: 170,
        text: "Frontend - React, JavaScript, HTML, CSS",
      });

      createStaticPlatform({
        x: 1417,
        y: 7550,
        width: 650,
        height: 170,
        text: "Backend - Node.js, APIs, databases",
      });

      createStaticPlatform({
        x: 2335,
        y: 7550,
        width: 650,
        height: 170,
        text: "Data - PostgreSQL, Prisma, classical ML",
      });

      createStaticPlatform({
        x: 950,
        y: 8000,
        width: 700,
        height: 170,
        text: "Game Development - Phaser, Roblox Studio",
      });

      createStaticPlatform({
        x: 1950,
        y: 8000,
        width: 700,
        height: 170,
        text: "Development - Git, Linux, APIs, modular systems",
      });

      // =========================================================
      // CODE PHILOSOPHY
      // =========================================================

      createLabel({
        text: "HOW I LIKE TO BUILD",
        x: 1417,
        y: 8350,
        fontSize: 60,
        colour: "#00ffff",
      });

      createPlatformRing({
        x: 1417,
        y: 9300,
        width: 320,
        height: 200,
        stringsDescription: "My Code",
        strings: [
          "Modular",
          "Flexible",
          "Configurable",
          "Expandable",
          "Reusable",
          "Data Driven",
        ],
      });

      // =========================================================
      // CURRENT WORK
      // =========================================================

      createLabel({
        text: "CURRENTLY BUILDING",
        x: 1417,
        y: 10300,
        fontSize: 60,
        colour: "#00ffff",
      });

      createStaticPlatform({
        x: 700,
        y: 10400,
        width: 700,
        height: 190,
        text: "AI Tutor - adaptive revision using data and machine learning",
      });

      createStaticPlatform({
        x: 2150,
        y: 10400,
        width: 700,
        height: 190,
        text: "More experimental software and game projects",
      });

      // =========================================================
      // END MESSAGE
      // =========================================================

      createLabel({
        text: "The interesting part is what comes next.",
        x: 1417,
        y: 10900,
        fontSize: 50,
        colour: "#32f142",
      });

      createStaticPlatform({
        x: 1417,
        y: 11200,
        width: 700,
        height: 50,
        text: "",
      });

      createLabel({
        text: "THANKS FOR EXPLORING",
        x: 1417,
        y: 11400,
        fontSize: 65,
        colour: "#00ffff",
      });

      createLabel({
        text: "More projects coming soon...",
        x: 1417,
        y: 11550,
        fontSize: 45,
        colour: "#88ffff",
      });

      // =========================================================
      // KILL FLOOR
      // =========================================================

      createKillPlatform({
        x: 1417,
        y: 14000,
        width: 6000,
        height: 150,
      });
    }

    function update(time, delta) {
      updatePlayer(player, cursors);
      updatePlatforms(time, delta);
    }

    // =========================================================
    // PHASER CONFIG
    // =========================================================

    const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1500,
        height: 1000,
      },
      parent: gameContainerRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: {
            y: 600,
          },
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
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-blue-950">
      {/* =====================================================
          PHASER GAME
      ====================================================== */}

      <div ref={gameContainerRef} className="max-h-full max-w-full" />

      {/* =====================================================
          BUTTONS
      ====================================================== */}

      <div className="absolute top-6 right-6 z-10 flex flex-wrap justify-end gap-3">
        <Spectate />
        <Freeze />
        <Respawn />
      </div>

      {/* =====================================================
          MOBILE CONTROLS
      ====================================================== */}

      <div className="absolute bottom-6 left-6 z-10 flex gap-2">
        <ArrowKey direction="left" />
        <ArrowKey direction="right" />
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <ArrowKey direction="up" />
        <ArrowKey direction="down" />
      </div>

      {/* =====================================================
          PORTAL CONFIRMATION
      ====================================================== */}

      {showConfirmation && (
        <Confirmation
          details={
            `This will take you to my ${portalOptions.name} project. ` +
            `You can view the demo or the code.`
          }
          demoURL={portalOptions.demoURL}
          codeURL={portalOptions.codeURL}
          onChosen={() => {
            setShowConfirmation(false);
          }}
        />
      )}
    </div>
  );
}