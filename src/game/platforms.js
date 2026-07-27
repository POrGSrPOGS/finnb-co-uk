import { addStaticPlatform, addMovingPlatform } from "./collisions";

const linearPlatforms = [];
const circularPlatforms = [];

export function createStaticPlatform(config) {
  const { x, y, width, height } = config;

  const platform = addStaticPlatform(x, y);
  platform.setDisplaySize(width, height);
  platform.refreshBody();
}

export function createLinearPlatform(config) {
  const {
    axisConstant,
    width,
    height,
    axis,
    start,
    end,
    velocity = 100,
  } = config;

  const platform =
    axis.toLowerCase() == "x"
      ? addMovingPlatform(start, axisConstant)
      : addMovingPlatform(axisConstant, start);

  platform.body.setAllowGravity(false);
  platform.setDisplaySize(width, height);
  platform.body.immovable = true;

  platform.body[`setVelocity${axis.toUpperCase()}`](velocity);

  const linearPlatform = { platform, axis, start, end, velocity };
  linearPlatforms.push(linearPlatform);
}

export function updateLinearPlatform(linearPlatform) {
  const { platform, axis, start, end, velocity } = linearPlatform;

  if (platform[axis.toLowerCase()] <= start) {
    platform.body[`setVelocity${axis.toUpperCase()}`](velocity);
  } else if (platform[axis.toLowerCase()] >= end) {
    platform.body[`setVelocity${axis.toUpperCase()}`](-velocity);
  }
  
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
  } = config;

  const platform = addMovingPlatform();
  platform.body.setAllowGravity(false);
  platform.setDisplaySize(width, height);
  platform.body.immovable = true;

  platform.setPosition(
    centreX + radius * Math.cos(angle),
    centreY + radius * Math.sin(angle)
  );

  const circularPlatform = { platform, centreX, centreY, radius, velocity, angle };
  circularPlatforms.push(circularPlatform);
}

export function updateCircularPlatform(circularPlatform, delta) {
  const { platform, centreX, centreY, radius, velocity, angle } = circularPlatform;

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