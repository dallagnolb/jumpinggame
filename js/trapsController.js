import Trap from "./trap.js";

export default class TrapsController {
  TRAP_INTERVAL_MIN = 500;
  TRAP_INTERVAL_MAX = 2000;

  nextTrapInterval = null;
  traps = [];

  constructor(context, trapImage, scaleRatio, speed) {
    this.context = context;
    this.canvas = context.canvas;
    this.trapsImages = trapImage;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextTrapTime();
  }

  getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  setNextTrapTime() {
    const num = this.getRandomNumberInRange(
      this.TRAP_INTERVAL_MIN,
      this.TRAP_INTERVAL_MAX
    );

    this.nextTrapInterval = num;
  }

  createTrap() {
    const randomIndex = this.getRandomNumberInRange(
      0,
      this.trapsImages.length - 1
    );
    const trapImage = this.trapsImages[randomIndex];
    const x = this.canvas.width * 1.5;
    const y = this.canvas.height - trapImage.height - 22 * this.scaleRatio;
    const trap = new Trap(
      this.context,
      x,
      y,
      trapImage.width,
      trapImage.height,
      trapImage.image
    );

    this.traps.push(trap);
  }

  update(gameSpeed, timeDelta) {
    if (this.nextTrapInterval <= 0) {
      this.createTrap();
      this.setNextTrapTime();
    }
    this.nextTrapInterval -= timeDelta;

    this.traps.forEach((trap) => {
      trap.update(this.speed, gameSpeed, timeDelta, this.scaleRatio);
    });

    this.traps = this.traps.filter((trap) => trap.x > -trap.width);
  }

  draw() {
    this.traps.forEach((trap) => trap.draw());
  }

  collideWith(sprite) {
    return this.traps.some((trap) => trap.collideWith(sprite));
  }

  reset() {
    this.traps = [];
  }
}
