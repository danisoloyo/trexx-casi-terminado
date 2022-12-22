var PLAY=1;
var END=0;
var gameState= PLAY;
var trex ,trex_running;
var edges;
var ground, groundIng, invisible;
var nubeIng, nube;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6
var gameOver, restart, gameOverImg, restartImg;
var die, checkpoint, jumpup;
var score=0;
function preload(){
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
 trex_collided=loadAnimation("trex_collided.png");
 
obstaculo2=loadImage("obstacle2.png");
obstaculo3=loadImage("obstacle3.png");
obstaculo4=loadImage("obstacle4.png");
obstaculo5=loadImage("obstacle5.png");
obstaculo6=loadImage("obstacle6.png");
groundImg=loadImage("ground2.png");
nubeIng=loadImage("cloud.png");
gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
die=loadSound("die.mp3"); 
checkpoint=loadSound("checkpoint.mp3");
jumpup=loadSound("jump.mp3");


}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //crear sprite de Trex
  trex=createSprite(50, height-30, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
trex.scale=0.7;
  edges=createEdgeSprites();
// piso
ground= createSprite(200, height-30, 600, 20);
ground.addImage(groundImg);
invisible=createSprite(200,height-20,600,10);
invisible.visible=false;
grupoNubes=createGroup();
grupoobstaculo=createGroup();
// sprites del fin del mundo
gameOver= createSprite(280,80);
gameOver.addImage(gameOverImg);
gameOver.scale=0.7;
gameOver.visible=false;

restart= createSprite(280,150); 
restart.addImage(restartImg);
restart.scale=0.5;
restart.visible=false;

}
function draw(){
  background("yellow")
  textSize(30);

  text("puntuacion:" + score,width -250,100 );



 if(gameState === PLAY){
//velocidad de piso
  ground.velocityX=-2;

  //regeneracion de piso
  if(ground.x < 0){
  ground.x=ground.width/2; 
 }

  if(keyDown("space") &&trex.y>=100){ 
  trex.velocityY=-10; 
  jumpup.play();
 }

  trex.velocityY=trex.velocityY+0.8;
  trex.collide(invisible);
 
crearNubes();
crearObstaculos();

score = score + Math.round(frameCount/100);

if (grupoobstaculo.isTouching(trex)){
  gameState=END; 
  die.play();
}
}else if(gameState === END){
  gameOver.visible=true;
  restart.visible=true;
   //velocidad de piso
    ground.velocityX=0; 
    //velocidad Trex 
    trex.velocityY=0; 
// velocidad obstaculos y nubes
    grupoNubes.setVelocityXEach(0);
    grupoobstaculo.setVelocityXEach(0);
    // tiempo de vida
    grupoNubes.setLifetimeEach(0);
    grupoobstaculo.setLifetimeEach(-1);
    // cambio de animacion
    trex.changeAnimation("collided");
}


   
drawSprites();
}
//funcion de nuestras nubes
function crearNubes (){
  if(frameCount % 60 === 0){ 
  var nube= createSprite (width,100,30,10);
  nube.addImage(nubeIng);
 nube.scale=0.5;
 nube.y=Math.round(random(10,300));
  nube.velocityX=-3;
  nube.depth=trex.depth;
  trex.depth=trex.depth+3;
  nube.lifetime=600;
  grupoNubes.add(nube);
}
}
// Funcion de obstaculos
function crearObstaculos(){
  if(frameCount % 60 === 0){
  var obstaculo=createSprite(width,height-50,30,10);
var num= Math.round(random(1,6));
switch (num){
  case 1: obstaculo.addImage(obstaculo1);
  case 2: obstaculo.addImage(obstaculo2);
  case 3: obstaculo.addImage(obstaculo3);
  case 4: obstaculo.addImage(obstaculo4);
  case 5: obstaculo.addImage(obstaculo5);
  case 6: obstaculo.addImage(obstaculo6);
 
}

obstaculo.scale=0.5; 
 obstaculo.velocityX=-5;
 obstaculo.lifetime=600; 
 grupoobstaculo.add(obstaculo);
}
}
