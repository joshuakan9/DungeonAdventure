let player  = {x: 100, y: 100, h: 30, w: 30};
let playerbuddy  = {
  player: player, 
  x: player.x + 100, 
  y: player.y + 100, 
  h: player.h/2,
  w: player.w/2
};

function setup() {
  createCanvas(1000, 1000);
  frameRate(60);
}

function draw() {

  updateKeyInput();
  
  background(100,100,255);
  //playerbuddy
  fill(100,150,100);
  rect(player.x + 40, player.y + 40, playerbuddy.h, playerbuddy.w);
  //player
  fill(100,200,100);
  rect(player.x, player.y, player.h, player.w);




}

function updateKeyInput() {
  if (keyIsDown(68)) { //D right
      player.x += 5;
  }
  if (keyIsDown(65)) { //A left
      player.x -= 5;
  }
  if (keyIsDown(87)) { //W up
      player.y -= 5;
  }
  if (keyIsDown(83)) { //S down
    player.y += 5;
}
}

