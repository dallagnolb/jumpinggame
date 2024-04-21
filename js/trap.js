export default class Trap {
  constructor(context, x, y, width, height, image) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  update(speed, gameSpeed, timeDelta, scaleRatio) {
    this.x -= speed * gameSpeed * timeDelta * scaleRatio;
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collideWith(sprite) {
    const adjustBy = 1.3;
    if (
      sprite.x < this.x + this.width / adjustBy &&
      sprite.x + sprite.width / adjustBy > this.x &&
      sprite.y < this.y + this.height / adjustBy &&
      sprite.y + sprite.height / adjustBy > this.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
