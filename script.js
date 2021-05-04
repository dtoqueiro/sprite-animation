const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
  playerState = e.target.value;
});
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

// Set constants with the same width and height defined in the css file
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

//Normally total width divided by number of columns
// 6876px / 12 columns = 573 px;
//We will use 575, because in this case the columns have different sizes
const spriteWidth = 575;

//Similar to width total height divided by number of rows
// 5230px / 10 rows = 523 px;
const spriteHeight = 523;

// let frameX = 0;
// let frameY = 0;

//Control animation speed
let gameFrame = 0;
let staggerFrames = 5;
let playerState = "idle";

//Positions
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

// Import Sprite Sheet
const playerImage = new Image();
playerImage.src = "./assets/shadow_dog.png";

console.log(spriteAnimations["idle"].loc.length);
function animate() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //context.drawImage(
  // image,
  // source_x,
  // source_y,
  // source_width,
  // source_height,
  // destination_x,
  // destination_y,
  // destination_width,
  // destination_height,
  // );
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  //frameY = spriteHeight * position;
  context.drawImage(
    playerImage,
    frameX, //Navigate horizontal in the Sprite
    frameY, //Navigate vertically in the sprite
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  // if (gameFrame % staggerFrames === 0) {
  //   if (frameX < 6) frameX++;
  //   else frameX = 0;
  // }
  gameFrame++;
  //avoid gameFrame too large
  if (gameFrame === spriteAnimations["idle"].loc.length * staggerFrames)
    gameFrame = 0;

  requestAnimationFrame(animate);
}
animate();
