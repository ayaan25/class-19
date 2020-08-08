var trex, trex_running, trex_collided,ground , ground_image, invisible_ground, ob1,ob2,ob3,ob4,ob5,ob6,cloud_image,cloudsGroup,obstaclesGroup,score;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload () {
  trex_running = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  ground_image = loadImage("ground2.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  cloud_image = loadImage("cloud.png");
}
  
function setup() {
  createCanvas(600,300);
  trex = createSprite(50,280,10,10);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  score = 0
  
  ground = createSprite(300,280,600,10);
  ground.addImage(ground_image);
  ground.x = ground.width/2;
  
  invisible_ground = createSprite(300,290,600,10);
  invisible_ground.visible = false;
}
function draw() {
  background(180);
  
trex.collide(invisible_ground);

  
  if (gamestate === PLAY){
    ground.velocityX = -6;
  if (ground.x<0){
    ground.x=ground.width/2;
  }
  if (keyDown("space")&& trex.y> 259){
trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.8;  
  spawnClouds();
  spawnObstacles();
    
    if (obstaclesGroup.isTouching(trex)){
      gamestate = END;
  }
  }
   if (gamestate === END){
     ground.velocityX = 0;
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     cloudsGroup.setLifetimeEach(-1);
     obstaclesGroup.setLifetimeEach(-1);
     trex.velocityY = 0;
     trex.changeAnimation("collided",trex_collided);
   }
 drawSprites(); 
}
function spawnClouds() {
  if (frameCount % 70 === 0){
    var cloud = createSprite(600,200);
    cloud.addImage ("cloud",cloud_image);
    cloud.velocityX = -5;
    cloud.scale = 0.5;
    cloud.y = Math.round(random(120,220));
    cloud.lifetime = 150;
    trex.depth = cloud.depth+1;
    cloudsGroup.add(cloud);
}
}
function spawnObstacles() {
  if (frameCount % 80 === 0){
    var obstacle = createSprite(600,270);
    obstacle.velocityX = -5;
    obstacle.scale = 0.5;
    var r = Math.round(random(1,6));
    switch(r){
      case 1:obstacle.addImage(ob1);
        break;
      case 2:obstacle.addImage(ob1);
        break;
        case 3:obstacle.addImage(ob1);
        break;
        case 4:obstacle.addImage(ob1);
        break;
        case 5:obstacle.addImage(ob1);
        break;
        case 6:obstacle.addImage(ob1);
        break;
        default:break;
    }
    obstacle.lifetime = 150;
    obstaclesGroup.add(obstacle);
}
}  