class Pipe {
  constructor() {
    this.xPipe = width;
    this.velPipe = -2;
    this.pipeSpace = 125;
    this.hUpperPipe = random(10, 470 - this.pipeSpace);
    this.wPipe = 100;
  }

  show() {
    this.xPipe += this.velPipe;
    rect(this.xPipe, 0, this.wPipe, this.hUpperPipe);
    rect(this.xPipe, this.hUpperPipe + this.pipeSpace, this.wPipe, width - (this.hUpperPipe + this.pipeSpace));
  }
}