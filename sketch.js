var toto, toto_img,totomorte_img;
var bordas;
var chao, chao_img;
var chaoi;
var nuvem, nuvem_img;
var restart, restart_img;
var gameover, gameover_img;
var check;
var die;
var jump;
var obs;
var gn;
var go;
var pont = 0;
var JOGAR = 1;
var ACABOU = 0;
var modo = JOGAR;



function preload(){
  // pré carrega as imagens do jogo
  toto_img = loadAnimation("trex1.png","trex3.png","trex4.png");
  totomorte_img = loadImage("trex_collided.png");
  
  chao_img = loadImage("ground2.png");
  
  nuvem_img = loadImage("cloud.png");
  
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  
  restart_img = loadImage("restart.png");
  
  gameover_img = loadImage("gameOver.png");
  
  check = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  
}

function setup(){
  //função de configuração
  createCanvas(windowWidth,windowHeight);

  
  //console.log(x);
  
  //sprite do trex
  toto = createSprite(50,height-50,20,20);
  toto.addAnimation("running",toto_img);
  toto.addImage("morto",totomorte_img);
  toto.scale = 0.6;
  //toto.debug = true;
  toto.setCollider("circle",0,0,35);
  
  bordas = createEdgeSprites();
  
  chao = createSprite(width/2,height-10,width,20);
  chao.x = chao.width/2;
  chao.addImage("solo",chao_img);
  
  chaoi = createSprite(width/2,height+5,width,20);
  chaoi.visible = false;
  
  gn = new Group();
  go = new Group();
  
  restart = createSprite(width/2,height/2+80,10,10);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  restart.visible = false;
  
  gameover = createSprite(width/2,height/2+50,10,10);
  gameover.addImage(gameover_img);
  gameover.scale = 0.6;
  gameover.visible = false;
  
}

function draw(){
  background("white");
  
  text("Pontos = " + pont,width/2-40,height-280);
  
  
  //console.log(toto.y);
  
  if(modo===JOGAR){
    
    pont = pont + Math.round(frameRate()/60);
    
    if(pont%100===0 && pont > 0){
      //check.play();
    }
    
    restart.visible = false;
    gameover.visible = false;
    
    //pulo do toto
    if(toto.isTouching(chao) && touches.length>0){
    toto.velocityY = -13;
    jump.play();
    touches = [];
      
    }
    
    if(chao.x < 0){
    chao.x = chao.width/2;
     
    }
     
   //gravidade
   toto.velocityY = toto.velocityY +0.8;
  
   chao.velocityX = - (5 + pont/100);
    
   nuvens();
  
   obstaculos(); 
    
   if(toto.isTouching(go)){
     modo = ACABOU;
     die.play();
   } 
    
  }
  else if(modo===ACABOU){
    chao.velocityX = 0;
    toto.velocityY = 0;
    gn.setVelocityXEach(0);
    go.setVelocityXEach(0);
    gn.setLifetimeEach(-1);
    go.setLifetimeEach(-1);
    toto.changeAnimation("morto");
    restart.visible = true;
    gameover.visible = true;
    
    if(touches.length>0){
      reiniciar();
      touches=[];
    }
    
  }

  
  toto.collide(chaoi);
  
  drawSprites();
}

function nuvens(){
  
  if (frameCount%90===0) {
   nuvem = createSprite(width+20,100,10,10);
   nuvem.velocityX = -2;
   nuvem.addImage(nuvem_img);
   nuvem.scale = 0.6;
   nuvem.y = Math.round(random(height-170,height-80))
   nuvem.depth = toto.depth;
   toto.depth = toto.depth + 1;
   nuvem.lifetime = width+20;
   gn.add(nuvem);
   //console.log(toto.depth,nuvem.depth);
  }
}

function obstaculos(){
  if (frameCount%80===0){
    obs = createSprite(width+20,height-20,10,10);
    obs.velocityX = - (5 + pont/100);
    
    var nr = Math.round(random(1,6))
    switch(nr){
      case 1 : obs.addImage(obs1);
      break;
      case 2 : obs.addImage(obs2);
      break;
      case 3 : obs.addImage(obs3);
      break;
      case 4 : obs.addImage(obs4);
      break;
      case 5 : obs.addImage(obs5);
      break;
      case 6 : obs.addImage(obs6);
      break;
      default: break;
     
    }
    
    obs.scale = 0.5;
    obs.lifetime = width+30;
    
    go.add(obs);
    
  }
}

function reiniciar(){
  modo = JOGAR;
  go.destroyEach();
  gn.destroyEach();
  pont = 0;
  toto.changeAnimation("running");
}