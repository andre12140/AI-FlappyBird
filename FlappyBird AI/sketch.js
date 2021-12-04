let bird = [];
let pipes = [];
const nBirds = 500;
let savedBirds = [];
let bestBirdAllTimer;

function setup() {
  createCanvas(750, 480);

  for (let x = 0; x < nBirds; x++) {
    bird[x] = new Bird();
  }
  pipes[0] = new Pipe();
  savedBirds = bird.slice();
}

function draw() {
  background(0);
  for (let x = 0; x < bird.length; x++) {
    bird[x].show();
  }
  // for (let i = 0; i < pipes.length; i++) {
  //   pipes[i].show();
  // }



  for (let x = 0; x < bird.length; x++) {
    if (bird[x].y < bird[x].radius * 1.2 || bird[x].y > (height - (bird[x].radius * 1.5))) {
      bird[x].hit();
      bird.splice(x, 1);
    }
  }


  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();

    let upperPipe = {
      x: pipes[i].xPipe,
      y: 0,
      w: pipes[i].wPipe,
      h: pipes[i].hUpperPipe
    };
    let lowerPipe = {
      x: pipes[i].xPipe,
      y: pipes[i].hUpperPipe + pipes[i].pipeSpace,
      w: pipes[i].wPipe,
      h: width - (pipes[i].hUpperPipe + pipes[i].pipeSpace)
    };

    if (pipes[i].xPipe < -pipes[i].wPipe) {
      pipes.splice(i, 1);
    }

    for (let x = 0; x < bird.length; x++) {
      if (this.collision(bird[x].x, bird[x].y, bird[x].radius, upperPipe) || this.collision(bird[x].x, bird[x].y, bird[x].radius, lowerPipe)) {
        bird[x].hit();
        bird.splice(x, 1);
      }
    }
  }

  if (frameCount % 150 == 0) {
    pipes.push(new Pipe());
  }

  let closestPipe = null;
  let record = Infinity;
  for (let i = 0; i < pipes.length; i++) {
    let diff = pipes[i].xPipe;
    if (diff > 0 && diff < record) {
      record = diff;
      closestPipe = pipes[i];
    }
  }

  // if (frameCount > 400 && frameCount < 410) {  //debug
  //   console.log(closestPipe);
  //   noLoop();
  // }

  if (closestPipe != null) {
    for (let x = 0; x < bird.length; x++) {
      bird[x].think(closestPipe);
    }
  }


  if (bird.length === 0) {
    let bestBird = getHighScore();
    createMutatedBirds(bestBird);
  }
}

function createMutatedBirds(bestBird) {
  bird = [];

  for (let x = 0; x < nBirds; x++) {
    bird[x] = new Bird(bestBird.brain.copy());
    bird[x].brain.mutate();
  }
  savedBirds = bird.slice();

  frameCount = 0;
  pipes = [];
  pipes[0] = new Pipe();
}

function getHighScore() {
  let highScore;
  highScore = savedBirds[0];
  for (bird in savedBirds) {
    if (highScore.score < savedBirds[bird].score) {
      highScore = savedBirds[bird];
    }
  }
  // if (!bestBirdAllTimer || bestBirdAllTimer.score < highScore.score) {
  //   bestBirdAllTimer = highScore;
  // } else if (bestBirdAllTimer.score > highScore.score) {
  //   highScore = bestBirdAllTimer;
  // }
  console.log("highScore");
  console.log(highScore);
  // noLoop();
  return highScore;
}

// function keyPressed() {
//   if (key === ' ') {
//     bird.jump();
//   }
// }



//cx cy center of the bird
//radius of the bird
//rx,ry top left of the Pipe
//rw. rh dimensions of the Pipe
function collision(cx, cy, radius, pipe) {
  let circle = {
    x: cx,
    y: cy,
    r: radius
  };
  let rect = pipe;

  let distX = Math.abs(circle.x - rect.x - rect.w / 2);
  let distY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (distX > (rect.w / 2 + circle.r)) {
    return false;
  }
  if (distY > (rect.h / 2 + circle.r)) {
    return false;
  }

  if (distX <= (rect.w / 2)) {
    return true;
  }
  if (distY <= (rect.h / 2)) {
    return true;
  }

  let dx = distX - rect.w / 2;
  let dy = distY - rect.h / 2;
  return (dx * dx + dy * dy <= (circle.r * circle.r));
}