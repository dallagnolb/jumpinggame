export default class Layer {
  constructor(context, width, height, moveSpeed, y, image, scaleRatio) {
    this.context = context;
    this.canvas = context.canvas;
    this.x = 0;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.speedModifier = moveSpeed;
    this.scaleRatio = scaleRatio;
  }

  update(gameSpeed, timeDelta) {
    this.x -= gameSpeed * timeDelta * this.speedModifier * this.scaleRatio;
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);

    this.context.drawImage(
      this.image,
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
