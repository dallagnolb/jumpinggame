export default class Player {
  RUN_ANIMATION_FRAMERATE = 50;
  runAnimationFrameTime = this.RUN_ANIMATION_FRAMERATE;
  runAnimationFrameIndex = 0;
  playerRunImages = [];

  JUMP_SPEED = 0.55;
  GRAVITY = 0.0015;
  yVelocity = 0;

  constructor(
    context,
    width,
    height,
    minJumpHeight,
    maxJumpHeight,
    scaleRatio
  ) {
    this.context = context;
    this.canvas = context.canvas;
    this.width = width;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;

    this.x = 10 * scaleRatio;
    this.y = this.canvas.height - this.height - 22 * scaleRatio;
    this.playerStandingPositionY = this.y;

    this.isJumping = false;

    // Jumping frames
    this.jumpImage = new Image();
    this.jumpImage.src = "./img/jumping/jump_up.png";
    this.fallImage = new Image();
    this.fallImage.src = "./img/jumping/fall.png";

    // Running frames
    const playerRunImage00 = new Image();
    playerRunImage00.src = "./img/running/run00.png";
    this.image = playerRunImage00;
    const playerRunImage01 = new Image();
    playerRunImage01.src = "./img/running/run01.png";
    const playerRunImage02 = new Image();
    playerRunImage02.src = "./img/running/run02.png";
    const playerRunImage03 = new Image();
    playerRunImage03.src = "./img/running/run03.png";
    const playerRunImage04 = new Image();
    playerRunImage04.src = "./img/running/run04.png";
    const playerRunImage05 = new Image();
    playerRunImage05.src = "./img/running/run05.png";
    const playerRunImage06 = new Image();
    playerRunImage06.src = "./img/running/run06.png";
    const playerRunImage07 = new Image();
    playerRunImage07.src = "./img/running/run07.png";
    const playerRunImage08 = new Image();
    playerRunImage08.src = "./img/running/run08.png";
    const playerRunImage09 = new Image();
    playerRunImage09.src = "./img/running/run09.png";
    const playerRunImage10 = new Image();
    playerRunImage10.src = "./img/running/run10.png";
    const playerRunImage11 = new Image();
    playerRunImage11.src = "./img/running/run11.png";

    this.playerRunImages.push(playerRunImage00);
    this.playerRunImages.push(playerRunImage01);
    this.playerRunImages.push(playerRunImage02);
    this.playerRunImages.push(playerRunImage03);
    this.playerRunImages.push(playerRunImage04);
    this.playerRunImages.push(playerRunImage05);
    this.playerRunImages.push(playerRunImage06);
    this.playerRunImages.push(playerRunImage07);
    this.playerRunImages.push(playerRunImage08);
    this.playerRunImages.push(playerRunImage09);
    this.playerRunImages.push(playerRunImage10);
    this.playerRunImages.push(playerRunImage11);

    window.removeEventListener("keydown", this.onJumpKeyDown);
    window.removeEventListener("keyup", this.onJumpKeyUp);

    window.addEventListener("keydown", this.onJumpKeyDown);
    window.addEventListener("keyup", this.onJumpKeyUp);
  }

  onJumpKeyDown = (event) => {
    if (event.code !== "Space" || this.isJumping) return;

    this.yVelocity = this.JUMP_SPEED;
    this.isJumping = true;
    const audio = new Audio();
    audio.src = "./snd/jump.mp3";
    audio.play();
  };

  onJumpKeyUp = (event) => {
    if (event.code === "Space") {
      if (this.yVelocity > 0) {
        this.yVelocity = 0;
      }
    }
  };

  update(gameSpeed, timeDelta) {
    this.handleRun(gameSpeed, timeDelta);

    if (this.isJumping) {
      if (this.yVelocity < 0) {
        this.image = this.fallImage;
      } else if (this.yVelocity > 0) {
        this.image = this.jumpImage;
      }
    }
    this.handleJump(timeDelta);
  }

  handleRun(gameSpeed, timeDelta) {
    if (this.runAnimationFrameTime <= 0) {
      this.image = this.playerRunImages[this.runAnimationFrameIndex++ % 12];
      this.runAnimationFrameTime = this.RUN_ANIMATION_FRAMERATE;
    }
    this.runAnimationFrameTime -= timeDelta * gameSpeed;
  }

  handleJump(timeDelta) {
    if (!this.isJumping) return;
    if (this.y > this.playerStandingPositionY) {
      this.y = this.playerStandingPositionY;
      this.isJumping = false;
      this.yVelocity = 0;
    } else {
      this.y -= this.yVelocity * timeDelta * this.scaleRatio;
      this.yVelocity -= this.GRAVITY * timeDelta;
    }
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
