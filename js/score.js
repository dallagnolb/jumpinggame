export default class Score {
  score = 0;
  HIGH_SCORE_STRING = "highScore";

  constructor(context, scaleRatio) {
    this.context = context;
    this.canvas = context.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(timeDelta) {
    this.score += timeDelta * 0.01;
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_STRING));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_STRING, Math.floor(this.score));
    }
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_STRING));
    const positionY = 20 * this.scaleRatio;

    const fontSize = 14 * this.scaleRatio;
    const fontFamily = '"Press Start 2P", system-ui';
    this.context.font = `${fontSize}px ${fontFamily}`;
    this.context.fillStyle = "orange";
    const scorePositionX = this.canvas.width - 100 * this.scaleRatio;
    const highScorePositionX = scorePositionX - 175 * this.scaleRatio;

    const scoreDigits = Math.floor(this.score).toString().padStart(6, 0);
    const highScoreDigits = highScore.toString().padStart(6, 0);

    this.context.fillText(scoreDigits, scorePositionX, positionY);
    this.context.fillText(
      `HIGH ${highScoreDigits}`,
      highScorePositionX,
      positionY
    );
  }
}
