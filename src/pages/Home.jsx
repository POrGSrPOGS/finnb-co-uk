import { useEffect, useRef, useState } from "react";

import Phaser from "phaser";

import { initWorld } from "../game/world";

import {
  initPlayer,
  updatePlayer,
  respawn,
} from "../game/player";

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

      initCollisions.call(
        this,
        player,
        onPortalTouched
      );

      // =========================================================
      // INTRODUCTION
      // =========================================================

      createLabel({
        text: "I'm Finn Brierley, an aspiring software engineer",
        x: 2200,
        y: 800,
        fontSize: 60,
        colour: "#02beb5",
      });

      createLabel({
        text: "<- Explore my journey",
        x: 1900,
        y: 1100,
        fontSize: 50,
        colour: "#32f142",
      });

      createLabel({
        text:
          "Here is where I began, where I am now, and the projects I've made along the way",
        x: 1200,
        y: 1000,
        fontSize: 50,
        colour: "#44bdb7",
      });

      createStaticPlatform({
        x: 2000,
        y: 1350,
        width: 3200,
        height: 80,
      });

      createLinearPlatform({
        axis: "y",
        axisConstant: 200,
        width: 450,
        height: 180,
        start: 1400,
        end: 2000,
        text: "I've always had a love for designing and creating",
        velocity: 150,
      });

      // =========================================================
      // PROGRAMMING JOURNEY
      // =========================================================

      createLabel({
        text: "MY JOURNEY",
        x: 725,
        y: 1650,
        fontSize: 50,
        colour: "#00ffff",
      });

      // ---------------------------------------------------------
      // SCRATCH
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 725,
        y: 2000,
        width: 700,
        height: 200,
        text:
          "At 10 years old I started creating games on Scratch",
      });

      const scratch = this.add.image(
        725,
        1800,
        "scratch"
      );

      scratch.setDisplaySize(200, 200);
      scratch.setAlpha(0.5);

      // ---------------------------------------------------------
      // ROBLOX
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 1425,
        y: 2350,
        width: 750,
        height: 220,
        text:
          "By 12 I was coding games in Roblox by modifying open source code",
      });

      const roblox = this.add.image(
        1425,
        2130,
        "roblox"
      );

      roblox.setDisplaySize(180, 180);
      roblox.setAlpha(0.5);

      // ---------------------------------------------------------
      // ROBLOX FROM SCRATCH
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 2175,
        y: 2700,
        width: 750,
        height: 220,
        text:
          "At 13 I started building entire Roblox games from scratch",
      });

      // ---------------------------------------------------------
      // WEB DEVELOPMENT
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 2925,
        y: 3050,
        width: 750,
        height: 220,
        text:
          "I eventually moved into Python, JavaScript and web development",
      });

      // ---------------------------------------------------------
      // CURRENT DEVELOPMENT
      // ---------------------------------------------------------

      createStaticPlatform({
        x: 2175,
        y: 3400,
        width: 750,
        height: 220,
        text:
          "Now I'm building larger software projects and experimenting with machine learning",
      });

      // =========================================================
      // WHAT I CODE
      // =========================================================

      createPlatformRing({
        x: 1417,
        y: 3950,
        width: 320,
        height: 120,
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
        y: 4750,
        fontSize: 60,
        colour: "#00ffff",
      });

      createLabel({
        text:
          "Walk into a portal to explore one of my projects",
        x: 1417,
        y: 4870,
        fontSize: 40,
        colour: "#88ffff",
      });

      // =========================================================
      // AI REVISION WEBSITE
      // =========================================================

      createPortal({
        x: 400,
        y: 5300,
        colour: "red",
        options: {
          demoURL:
            "https://porgsrpogs.hackclub.app",
          codeURL:
            "https://github.com/POrGSrPOGS/ai-revision-website",
          name: "AI Revision Website",
        },
      });

      createStaticPlatform({
        x: 400,
        y: 5600,
        width: 600,
        height: 150,
        text: "AI Revision Website",
      });

      createLabel({
        text: "AI REVISION",
        x: 400,
        y: 5100,
        fontSize: 40,
        colour: "#ff5555",
      });

      // =========================================================
      // ROBLOX PROJECTS
      // =========================================================

      createPortal({
        x: 1100,
        y: 5300,
        colour: "red",
        options: {
          demoURL:
            "https://www.roblox.com/",
          codeURL: "",
          name: "Roblox Projects",
        },
      });

      createStaticPlatform({
        x: 1100,
        y: 5600,
        width: 600,
        height: 150,
        text: "Roblox Games",
      });

      createLabel({
        text: "ROBLOX",
        x: 1100,
        y: 5100,
        fontSize: 40,
        colour: "#ff5555",
      });

      // =========================================================
      // THIS PORTFOLIO
      // =========================================================

      createPortal({
        x: 1900,
        y: 5300,
        colour: "red",
        options: {
          demoURL:
            window.location.href,
          codeURL:
            "https://github.com/POrGSrPOGS/finnb-co-uk",
          name: "This Portfolio",
        },
      });

      createStaticPlatform({
        x: 1900,
        y: 5600,
        width: 600,
        height: 150,
        text: "This Portfolio",
      });

      createLabel({
        text: "THIS SITE",
        x: 1900,
        y: 5100,
        fontSize: 40,
        colour: "#ff5555",
      });

      // =========================================================
      // MORE RECENT / EXPERIMENTAL WORK
      // =========================================================

      createPortal({
        x: 2700,
        y: 5300,
        colour: "red",
        options: {
          demoURL:
            "https://github.com/POrGSrPOGS",
          codeURL:
            "https://github.com/POrGSrPOGS",
          name: "Other Projects",
        },
      });

      createStaticPlatform({
        x: 2700,
        y: 5600,
        width: 600,
        height: 150,
        text: "Other Projects",
      });

      createLabel({
        text: "EXPERIMENTS",
        x: 2700,
        y: 5100,
        fontSize: 40,
        colour: "#ff5555",
      });

      // =========================================================
      // FUTURE PROJECT
      // =========================================================

      createStaticPlatform({
        x: 3500,
        y: 5300,
        width: 600,
        height: 150,
        text:
          "More projects coming soon...",
      });

      createLabel({
        text: "COMING SOON",
        x: 3500,
        y: 5100,
        fontSize: 40,
        colour: "#32f142",
      });

      // =========================================================
      // TECHNICAL SKILLS
      // =========================================================

      createLabel({
        text: "TECHNICAL SKILLS",
        x: 1417,
        y: 6200,
        fontSize: 60,
        colour: "#00ffff",
      });

      createStaticPlatform({
        x: 500,
        y: 6550,
        width: 650,
        height: 170,
        text:
          "Frontend — React, JavaScript, HTML, CSS",
      });

      createStaticPlatform({
        x: 1417,
        y: 6550,
        width: 650,
        height: 170,
        text:
          "Backend — Node.js, APIs, databases",
      });

      createStaticPlatform({
        x: 2335,
        y: 6550,
        width: 650,
        height: 170,
        text:
          "Data — PostgreSQL, Prisma, classical ML",
      });

      createStaticPlatform({
        x: 950,
        y: 7000,
        width: 700,
        height: 170,
        text:
          "Game Development — Phaser, Roblox Studio",
      });

      createStaticPlatform({
        x: 1950,
        y: 7000,
        width: 700,
        height: 170,
        text:
          "Development — Git, Linux, APIs, modular systems",
      });

      // =========================================================
      // CODE PHILOSOPHY
      // =========================================================

      createLabel({
        text: "HOW I LIKE TO BUILD",
        x: 1417,
        y: 7750,
        fontSize: 60,
        colour: "#00ffff",
      });

      createPlatformRing({
        x: 1417,
        y: 8300,
        width: 320,
        height: 120,
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
        y: 9000,
        fontSize: 60,
        colour: "#00ffff",
      });

      createStaticPlatform({
        x: 700,
        y: 9400,
        width: 700,
        height: 190,
        text:
          "AI Tutor — adaptive revision using data and machine learning",
      });

      createStaticPlatform({
        x: 2150,
        y: 9400,
        width: 700,
        height: 190,
        text:
          "More experimental software and game projects",
      });

      // =========================================================
      // END MESSAGE
      // =========================================================

      createLabel({
        text:
          "The interesting part is what comes next.",
        x: 1417,
        y: 9900,
        fontSize: 50,
        colour: "#32f142",
      });

            createStaticPlatform({
        x: 1417,
        y: 10200,
        width: 700,
        height: 50,
        text:
          "",
      });

      createLabel({
        text: "THANKS FOR EXPLORING",
        x: 1417,
        y: 10400,
        fontSize: 65,
        colour: "#00ffff",
      });

      createLabel({
        text:
          "More projects coming soon...",
        x: 1417,
        y: 10550,
        fontSize: 45,
        colour: "#88ffff",
      });

      // =========================================================
      // KILL FLOOR
      // =========================================================

      createKillPlatform({
        x: 1417,
        y: 11000,
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
    <div className="flex items-center justify-center h-screen">
      {/* =====================================================
          PHASER GAME
      ====================================================== */}

      <div ref={gameContainerRef} />

      {/* =====================================================
          MOBILE CONTROLS
      ====================================================== */}

      <div className="absolute bottom-8 left-8 z-10">
        <ArrowKey direction="left" />
        <ArrowKey direction="right" />
      </div>

      <div className="absolute bottom-8 right-8 z-10 flex flex-col">
        <ArrowKey direction="up" />
        <ArrowKey direction="down" />
      </div>

      {/* =====================================================
          RESPAWN BUTTON
      ====================================================== */}

      <button
        className="
          absolute
          top-8
          right-8
          rounded
          bg-red-500
          px-4
          py-2
          text-white
          opacity-50
          active:scale-95
        "
        onClick={respawn}
      >
        Respawn
      </button>

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