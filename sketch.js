var balloon, balloonImage1, balloonImage2;
var database;
var height;

function preload() {
  bg = loadImage("assets/cityImage.png");
  balloonImage1 = loadAnimation("assets/HotAirBallon01.png");
  balloonImage2 = loadAnimation("assets/HotAirBallon01.png", "assets/HotAirBallon01.png",
    "assets/HotAirBallon01.png", "assets/HotAirBallon02.png", "assets/HotAirBallon02.png",
    "assets/HotAirBallon02.png", "assets/HotAirBallon03.png", "assets/HotAirBallon03.png", "assets/HotAirBallon03.png");
}

//Function to set initial environment
function setup() {

  database = firebase.database();

  createCanvas(1500, 700);

  balloon = createSprite(250, 650, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

  var balloonHeight = database.ref('hot-air-ballon/position');
  balloonHeight.on('value', readPosition, showError);

  textSize(20);
}

function draw() {
  background(bg);

  balloon.addAnimation("hotAirBalloon", balloonImage2);  

  if (keyDown(LEFT_ARROW)) {
    updateHeight(-10, 0);
  } else if (keyDown(RIGHT_ARROW)) {
    updateHeight(10, 0);
  } else if (keyDown(UP_ARROW)) {
    updateHeight(0, -10);
    balloon.scale = balloon.scale - 0.005;
  } else if (keyDown(DOWN_ARROW)) {
    updateHeight(0, 10);
    balloon.scale = balloon.scale + 0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
}

function updateHeight(x, y) {
  database.ref('hot-air-ballon/position').set({
    'x': height.x + x,
    'y': height.y + y
  })
}


function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError() {
  console.log("Error in writing to the database");
}