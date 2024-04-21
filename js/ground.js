export default class Ground {
  constructor(context, width, height, speed, scaleRatio) {
    this.context = context;
    this.canvas = context.canvas;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scaleRatio = scaleRatio;

    this.x = 0;
    this.y = this.canvas.height - this.height;

    this.grassGroundImage = new Image();
    this.grassGroundImage.src = "./img/bg/grassGround.png";
  }

  update(gameSpeed, timeDelta) {
    this.x -= gameSpeed * timeDelta * this.speed * this.scaleRatio;
  }

  draw() {
    this.context.drawImage(
      this.grassGroundImage,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.context.drawImage(
      this.grassGroundImage,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );

    if (this.x < -this.width) {
      this.x = 0;
    }
  }

  reset() {
    this.x = 0;
  }
}
