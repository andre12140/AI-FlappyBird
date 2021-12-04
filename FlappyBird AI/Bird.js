class Bird {
  // x = 100;
  // y = 100;
  // velY = 0.05;

  constructor(bigBrain) {
    this.y = 240;
    this.x = 100;
    this.velY = 2;
    this.radius = 15;
    this.score = 0;
    this.nJumps = 0;

    if (bigBrain) {
      this.brain = bigBrain;
    } else {
      this.brain = new NeuralNetwork(6, 8, 2);
    }
  }

  show() {
    this.y += this.velY;
    if (this.velY > 0) {
      this.falling();
      //console.log(this.bird.velY);
    } else if (this.velY <= 0) {
      this.rising();
    }
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  jump() {
    this.nJumps++;
    this.velY = -5;
  }

  falling() {
    if (this.velY <= 8) {
      this.velY = this.velY * 1.05;
    }
  }

  rising() {
    this.velY = this.velY * 0.9;
    if (this.velY >= -0.8) {
      this.velY = 2;
    }
  }

  think(closestPipe) {
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = this.velY / 10;
    inputs[2] = closestPipe.xPipe / width;
    inputs[3] = closestPipe.hUpperPipe / height;
    inputs[4] = closestPipe.hUpperPipe + closestPipe.pipeSpace / height;
    inputs[5] = (closestPipe.xPipe + closestPipe.wPipe) / width;

    let output = this.brain.query(inputs);
    if (output[0] > output[1]) {
      this.jump();
    }
  }

  hit() {
    this.score = (frameCount / 10);
    //console.log("Score: " + this.score);
    // console.log("HIT");
  }
}