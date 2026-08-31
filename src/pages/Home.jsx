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
import ContactModal from "../components/ContactModal";
import ContactButton from "../components/ContactButton";

const CYAN = "#00ffff";
const LIGHT_CYAN = "#88ffff";
const TEAL = "#02beb5";
const MID_TEAL = "#44bdb7";
const GREEN = "#32f142";
const RED = "#ff5555";

const PORTAL_WIDTH = 100;
const PORTAL_HEIGHT = 200;

const JOURNEY_STEPS = [
  {
    x: 800,
    y: 3000,
    width: 550,
    height: 200,
    text: "At 10 years old I started creating games on Scratch",
    image: { key: "scratch", y: 2800, size: 200 },
  },
  {
    x: 1425,
    y: 3350,
    width: 750,
    height: 220,
    text: "By 12 I was coding games in Roblox by modifying open source code",
    image: { key: "roblox", y: 3130, size: 180 },
  },
  {
    x: 2175,
    y: 3700,
    width: 750,
    height: 220,
    text: "At 13 I started building entire Roblox games from scratch",
  },
  {
    x: 2925,
    y: 4050,
    width: 750,
    height: 220,
    text: "I eventually moved into Python, JavaScript and web development",
  },
  {
    x: 2175,
    y: 4400,
    width: 750,
    height: 250,
    text: "Now I'm building larger software projects and experimenting with machine learning",
  },
];

const PROJECTS_PLATFORM_HEIGHT = 150;

const PROJECTS_Y = {
  label: 6100,
  platform: 6600,
};

PROJECTS_Y.portal =
  PROJECTS_Y.platform - PROJECTS_PLATFORM_HEIGHT / 2 - PORTAL_HEIGHT / 2;

const PROJECTS = [
  {
    x: 800,
    platformWidth: 1200,
    text: "AI Revision Website",
    label: "AI REVISION",
    labelColour: RED,
    portal: {
      demoURL: "https://porgsrpogs.hackclub.app",
      codeURL: "https://github.com/POrGSrPOGS/ai-revision-website",
      name: "AI Revision Website",
    },
  },
  {
    x: 2100,
    platformWidth: 1200,
    text: "This Portfolio",
    label: "THIS SITE",
    labelColour: RED,
    portal: {
      demoURL: typeof window !== "undefined" ? window.location.href : "",
      codeURL: "https://github.com/POrGSrPOGS/finnb-co-uk",
      name: "This Portfolio",
    },
  },
  {
    x: 3100,
    platformWidth: 500,
    text: "More projects coming soon...",
    label: "COMING SOON",
    labelColour: GREEN,
    portal: null,
  },
];

const SKILLS = [
  { x: 500, y: 7550, width: 650, height: 170, text: "Frontend - React, JavaScript, HTML, CSS" },
  { x: 1417, y: 7550, width: 650, height: 170, text: "Backend - Node.js, APIs, databases" },
  { x: 2335, y: 7550, width: 650, height: 170, text: "Data - PostgreSQL, Prisma, classical ML" },
  { x: 950, y: 8000, width: 700, height: 170, text: "Game Development - Phaser, Roblox Studio" },
  { x: 1950, y: 8000, width: 700, height: 170, text: "Development - Git, Linux, APIs, modular systems" },
];

const CURRENT_WORK = [
  { x: 700, width: 700, height: 190, text: "AI Tutor - adaptive revision using data and machine learning" },
  { x: 2150, width: 700, height: 190, text: "More experimental software and game projects" },
];

const CONTACT_LINKS = [
  { label: "Email Me (finnbrierley@gmail.com)", url: "mailto:finnbrierley@gmail.com" },
  { label: "GitHub (POrGSrPOGS)", url: "https://github.com/POrGSrPOGS" },
  //{ label: "LinkedIn (Finn Brierley)", url: "https://www.linkedin.com/in/finn-%E2%80%8Ebrierley-6b78153a0/" },
  { label: "Resume (PDF)", url: "/resume.pdf" },
];

export default function Home() {
  const gameContainerRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [portalOptions, setPortalOptions] = useState({});

  function onPortalTouched(player, portal) {
    const options = portal.getData("options") || {};

    if (options.type === "contact") {
      setShowContact(true);
      return;
    }

    setPortalOptions(options);
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
      this.load.image("bluePortal", "/bluePortalBlue.png");
    }

    function create() {
      player = initPlayer.call(this);
      initWorld.call(this, player);
      initCollisions.call(this, player, onPortalTouched);
      initKeys.call(this);

      createLabel({
        text: "I'm Finn Brierley, an aspiring software engineer",
        x: 2200,
        y: 1800,
        fontSize: 60,
        colour: TEAL,
      });

      createLabel({
        text: "<- Explore my journey",
        x: 1900,
        y: 2100,
        fontSize: 50,
        colour: GREEN,
      });

      createLabel({
        text: "Here is where I began, where I am now, and the projects I've made along the way",
        x: 1200,
        y: 2000,
        fontSize: 50,
        colour: MID_TEAL,
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

      createLabel({
        text: "MY JOURNEY",
        x: 800,
        y: 2650,
        fontSize: 50,
        colour: CYAN,
      });

      for (const step of JOURNEY_STEPS) {
        createStaticPlatform({
          x: step.x,
          y: step.y,
          width: step.width,
          height: step.height,
          text: step.text,
        });

        if (step.image) {
          const sprite = this.add.image(step.x, step.image.y, step.image.key);
          sprite.setDisplaySize(step.image.size, step.image.size);
          sprite.setAlpha(0.5);
        }
      }

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

      createLabel({
        text: "PAST PROJECTS",
        x: 1417,
        y: 5750,
        fontSize: 60,
        colour: CYAN,
      });

      createLabel({
        text: "Walk into a portal to explore one of my projects",
        x: 1417,
        y: 5870,
        fontSize: 40,
        colour: LIGHT_CYAN,
      });

      for (const project of PROJECTS) {
        if (project.portal) {
          createPortal({
            x: project.x,
            y: PROJECTS_Y.portal,
            colour: "red",
            options: project.portal,
          });
        }

        createStaticPlatform({
          x: project.x,
          y: PROJECTS_Y.platform,
          width: project.platformWidth,
          height: 150,
          text: project.text,
        });

        createLabel({
          text: project.label,
          x: project.x,
          y: PROJECTS_Y.label,
          fontSize: 40,
          colour: project.labelColour,
        });
      }

      createLabel({
        text: "TECHNICAL SKILLS",
        x: 1417,
        y: 7200,
        fontSize: 60,
        colour: CYAN,
      });

      for (const skill of SKILLS) {
        createStaticPlatform(skill);
      }

      createLabel({
        text: "HOW I LIKE TO BUILD",
        x: 1417,
        y: 8350,
        fontSize: 60,
        colour: CYAN,
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

      createLabel({
        text: "CURRENTLY BUILDING",
        x: 1417,
        y: 10300,
        fontSize: 60,
        colour: CYAN,
      });

      for (const item of CURRENT_WORK) {
        createStaticPlatform({
          x: item.x,
          y: 10400,
          width: item.width,
          height: item.height,
          text: item.text,
        });
      }

      createLabel({
        text: "The interesting part is what comes next.",
        x: 1417,
        y: 10900,
        fontSize: 50,
        colour: GREEN,
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
        colour: CYAN,
      });

      createLabel({
        text: "More projects coming soon...",
        x: 1417,
        y: 11550,
        fontSize: 45,
        colour: LIGHT_CYAN,
      });

      createLabel({
        text: "GET IN TOUCH",
        x: 2417,
        y: 11000,
        fontSize: 50,
        colour: CYAN,
      });

      createPortal({
        x: 2417,
        y: 11200,
        colour: "blue",
        options: {
          type: "contact",
          name: "Get In Touch",
        },
      });

      createStaticPlatform({
        x: 2417,
        y: 11400,
        width: 700,
        height: 150,
        text: "Walk in to find my contact details!",
      });

      createKillPlatform({
        x: 1417,
        y: 13000,
        width: 6000,
        height: 150,
      });
    }

    function update(time, delta) {
      updatePlayer(player, cursors);
      updatePlatforms(time, delta);
    }

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
      <div ref={gameContainerRef} className="max-h-full max-w-full" />

      <div className="absolute top-6 right-6 z-10 flex flex-wrap justify-end gap-3">
        <Spectate />
        <Freeze />
        <Respawn />
        <ContactButton onClick={() => setShowContact(true)} />
      </div>

      <div className="absolute bottom-6 left-6 z-10 flex gap-2">
        <ArrowKey direction="left" />
        <ArrowKey direction="right" />
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <ArrowKey direction="up" />
        <ArrowKey direction="down" />
      </div>

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

      {showContact && (
        <ContactModal
          links={CONTACT_LINKS}
          onChosen={() => {
            setShowContact(false);
          }}
        />
      )}
    </div>
  );
}