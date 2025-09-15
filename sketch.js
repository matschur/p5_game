let playerSprite;
let floor;
let jumpSwitch = false;
let backgroundImg;
let plataformas;
let gravity = 500;
let key;
let uWin;
let winSwitch = false;
let obstacles;
let obstaclesSwitch = false;
let heart;
let lives = 3;
let gameOver;
let gameOverSwitch = false;
let fire;
let keySwitch;

function preload(){
backgroundImg = loadImage("assets/back2.jpg");
uWin = loadImage("assets/uWIN.jpg");
heart = loadImage("assets/heart.png");
gameOver = loadImage("assets/gameOver.jpg");
}

function setup() {
    new Canvas(windowWidth, windowHeight);

    playerSprite = new Sprite();
    playerSprite.addAni('standing', 'assets/standing.png');
    playerSprite.addAni('left','assets/walkingLeft1.png','assets/walkingLeft2.png', 'assets/walkingLeft3.png');
    playerSprite.addAni('right','assets/walkingRight1.png','assets/walkingRight2.png', 'assets/walkingRight3.png')
    playerSprite.addAni('jumping', 'assets/jumping.png');
    playerSprite.w = 50;
    playerSprite.h = 50;
    //playerSprite.debug = true;
    //playerSprite.scale = 1;
    playerSprite.x = windowWidth/2 - 200;
    //playerSprite.gravityScale = 0.5;
    playerSprite.mass = 1;

    fire = new Sprite();
    fire.addAni('fire', 'assets/fire.png');
    fire.x = (windowWidth/7);
    fire.y = windowHeight-(windowHeight/4);
    fire.static = true;
    //fire.debug = true;

    floor = new Sprite(width/2,windowHeight-20,windowWidth,50,STATIC);
    floor.opacity = 0;  

    world.gravity.y = gravity;


    key = new Sprite();
    key.addAni('key','assets/key.png');
    key.x = windowWidth-150;
    key.y = 100;
    key.static = true;
    key.scale = 0.6;

    plataformas = new Group();
    //plataformas.color = 'red';
   
    while (plataformas.length < 3) {
        let plataforma = new plataformas.Sprite();
        plataforma.x = windowWidth - (plataformas.length * (windowWidth/8) + windowWidth / 10);
        plataforma.y = plataformas.length * (windowHeight/6) + windowHeight / 3;
        plataforma.addAni('plataforma','assets/metalPlatform.png');
        plataforma.scale = 0.4;
        plataforma.width = 100;
        plataforma.height = 30;
        //plataforma.debug = true;

        plataforma.static = true;
    }

    obstacles = new Group();
    while (obstacles.length < 3){

        let obstacle = new obstacles.Sprite();
        obstacle.x = windowWidth - obstacles.length * (windowWidth/8)-200;
        obstacle.y = -800 * obstacles.length;
        obstacle.scale = 0.25;
        obstacle.addAni('obstaculo','assets/obs0.png');
        obstacle.static = true;
        obstacle.gravityScale = 0.1;
    }

    //obstacles[0].x = windowWidth-470;
    //obstacles[1].x = windowWidth-320;
    //obstacles[2].x = windowWidth-110;

    print(windowWidth, windowHeight);
}

function update() {
   image(backgroundImg,0,0,windowWidth,windowHeight);
      playerSprite.rotation = 0;

//Sistema de Vidas
   if(lives == 3){
       image(heart,100,50,50,50);
       image(heart,150,50,50,50);
       image(heart,200,50,50,50);
   }
   if(lives == 2){
       image(heart,150,50,50,50);
       image(heart,200,50,50,50);
   }
   if(lives == 1){
       image(heart,200,50,50,50);
   }

   if(playerSprite.collides(obstacles)){
       lives -= 1;
   }

   if(playerSprite.collides(fire)&&!keySwitch) {
        lives -= 1;
   }

   if(lives == 0){
       gameOverSwitch = true;
   }

//sistema de Colisiones

    if (playerSprite.collides(floor)||playerSprite.collides(plataformas)) {
        //playerSprite.velocity.y = 0;
        jumpSwitch = true;
    }

    if(playerSprite.collides(plataformas)){
        obstaclesSwitch = true;
    }else{
        obstaclesSwitch = false;
    }

    if(obstaclesSwitch == true){
        obstacles[0].static = false;
        obstacles[1].static = false;
        obstacles[2].static = false;
    }

    for(var i = 0; i<obstacles.length;i++){
        if(obstacles.collides(floor)){
            obstacles[i].y = -800;
        }
    }


    //key and fire Interaction

    if(playerSprite.collides(key)){
        //print("Encontraste la llave!");
        keySwitch = true;
        key.position.x = -500;
       
    }

    if (playerSprite.collides(fire)&&keySwitch) {
        winSwitch = true;
    }

    if(winSwitch){
        image(uWin,0,0,width,height);
        for(var i = 0;i<3;i++){
            plataformas[i].position.x = -500;
            obstacles[i].position.x = -1000;
        }
        fire.x = -1000;

    }
    //playerSprite.speed = 3;

    if (kb.released('d')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('a')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('w')) {
        playerSprite.changeAni('standing');
    }

    if (kb.pressing('w')&&jumpSwitch==true) {
        playerSprite.velocity.y = -75;
        playerSprite.changeAni('jumping');
        jumpSwitch = false;
       
    }  else if (kb.pressing('a')) {
        playerSprite.velocity.x = -10;
        playerSprite.changeAni('left');
    } else if (kb.pressing('d')) {
        playerSprite.velocity.x = 10;
        playerSprite.changeAni('right');
    } else {
      playerSprite.speed = 0;
    }

//Mecánica final del juego
    if(gameOverSwitch){
       image(gameOver,0,0,width,height);
       plataformas[0].x = -1000;
       plataformas[1].x = -1000;
       plataformas[2].x = -1000;
       key.x = -1000;
       obstacles[0].x = -1000;
       obstacles[1].x = -1000;
       obstacles[2].x = -1000;
       fire.x = -1000;
       playerSprite.x = -2000;
   }
}
