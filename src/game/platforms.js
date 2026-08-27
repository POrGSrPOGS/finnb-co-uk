import { addStaticPlatform, addMovingPlatform, addKillPlatform, addPortal } from "./collisions";
import { getScene } from "./world";

const linearPlatforms = [];
const circularPlatforms = [];

export function wrapByCharLimit(text, maxCharsPerLine = 25) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;

    if (testLine.length > maxCharsPerLine && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);

  return lines;
}

export function createPortal({x, y, colour}) {
  const portal = addPortal(x, y, colour)
  portal.setDisplaySize(225, 275)
  portal.refreshBody();
}

export function createLabel(config) {
  let { text, x, y, fontSize, colour, scrollFactor } = config;

  text = text ?? "";
  colour = colour ?? "#ffffff";
  text = wrapByCharLimit(text);
  scrollFactor = scrollFactor ?? 1;

  const scene = getScene();
  const label = scene.add.text(x, y, text, {
    fontFamily: "Monospace",
    fontSize: `${fontSize}px`,
    color: colour,
  });

  label.setOrigin(0.5);
  label.setScrollFactor(scrollFactor)

  return label;
}

function attachLabel(platform, text) {
  const { x, y, displayWidth, displayHeight } = platform;

  const fontSize = displayHeight / 5.5;

  const label = createLabel({
    text,
    x,
    y,
    fontSize,
  });

  return label;
}

export function createStaticPlatform(config) {
  const { x, y, width, height, text } = config;

  const platform = addStaticPlatform(x, y);
  platform.setDisplaySize(width, height);
  platform.refreshBody();

  attachLabel(platform, text);
}

export function createKillPlatform(config) {
  const { x, y, width, height, text } = config;

  const platform = addKillPlatform(x, y);
  platform.setDisplaySize(width, height);
  platform.refreshBody();

  attachLabel(platform, text);
}

export function createLinearPlatform(config) {
  const {
    axisConstant,
    width,
    height,
    axis,
    start,
    end,
    text = "",
    velocity = 100,
  } = config;

  let startX;
  let startY;

  if (axis.toLowerCase() == "x") {
    startX = start;
    startY = axisConstant;
  } else {
    startX = axisConstant;
    startY = start;
  }

  const platform = addMovingPlatform(startX, startY);

  platform.body.setAllowGravity(false);
  platform.setDisplaySize(width, height);
  platform.body.immovable = true;

  platform.body[`setVelocity${axis.toUpperCase()}`](velocity);

  const label = attachLabel(platform, text);

  const linearPlatform = { platform, axis, start, end, velocity, label };
  linearPlatforms.push(linearPlatform);
}

export function updateLinearPlatform(linearPlatform) {
  const { platform, axis, start, end, velocity, label } = linearPlatform;

  if (platform[axis.toLowerCase()] <= start) {
    platform.body[`setVelocity${axis.toUpperCase()}`](velocity);
  } else if (platform[axis.toLowerCase()] >= end) {
    platform.body[`setVelocity${axis.toUpperCase()}`](-velocity);
  }

  label.setPosition(platform.x, platform.y);
}

export function createCircularPlatform(config) {
  const {
    width,
    height,
    centreX,
    centreY,
    radius,
    velocity = 100,
    angle = 0,
    text,
  } = config;

  const platform = addMovingPlatform();
  platform.body.setAllowGravity(false);
  platform.setDisplaySize(width, height);
  platform.body.immovable = true;

  const x = centreX + radius * Math.cos(angle);
  const y = centreY + radius * Math.sin(angle);
  platform.setPosition(x, y);

  const label = attachLabel(platform, text);

  const circularPlatform = {
    platform,
    centreX,
    centreY,
    radius,
    velocity,
    angle,
    label,
  };
  circularPlatforms.push(circularPlatform);
}

export function updateCircularPlatform(circularPlatform, delta) {
  const { platform, centreX, centreY, radius, velocity, angle, label } =
    circularPlatform;

  if (!platform?.active) return;

  const radians = angle * (Math.PI / 180);
  const angularSpeed = velocity / radius;

  const velocityX = -radius * angularSpeed * Math.sin(radians);
  const velocityY = radius * angularSpeed * Math.cos(radians);
  platform.setVelocityX(velocityX);
  platform.setVelocityY(velocityY);

  circularPlatform.angle += angularSpeed * (180 / Math.PI) * (delta / 1000);

  const newRadians = circularPlatform.angle * (Math.PI / 180);
  const x = centreX + radius * Math.cos(newRadians);
  const y = centreY + radius * Math.sin(newRadians);
  platform.setPosition(x, y);
  label.setPosition(x, y);
}

export function updatePlatforms(time, delta) {
  linearPlatforms.forEach((linearPlatform) => {
    updateLinearPlatform(linearPlatform);
  });
  circularPlatforms.forEach((circularPlatform) => {
    updateCircularPlatform(circularPlatform, delta);
  });
}
export function onPlatformTouched(player, platform) {
  player.x += platform.body.deltaX();
}
