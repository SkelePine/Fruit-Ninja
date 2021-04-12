// Dodge the ghost using your mouse, try to collect the fruits. Do not let more than 10 fruits pass or you lose. 
var PLAY = 1;
var START = 2;
var END = 0;
var gameState = 2;

var knife, fruit, monster, fruitGroup, monsterGroup, score, r, randomFruit, position;
var knifeImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage, gameOverSound, knifeSound;
var highScore = 0;
var fruitPass = 0;
var invisLeft, invisRight;

function preload() {

  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  knifeSound = loadSound("knifeSwoosh.mp3")
  gameOverSound = loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600, 600);
  invisLeft = createSprite(-30, 300, 10, 600)
  invisRight = createSprite(630, 300, 10, 600)
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7

  knife.setCollider("rectangle", 0, -20, 50, 50);


  score = 0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();

}

function draw() {
  background("lightblue");
  if (gameState == START) {
    knife.visible = false;
    fill('black')
    text("Dodge the ghosts using your mouse, while trying to collect the fruits. Do not let more than 10 fruits pass or you  ", 10, 200)
    text("lose. The game will get harder as you score more points. Press B To begin playing.", 10, 225)
    if (keyDown('b') && gameState == START) {
      gameState = PLAY;
    }
  }
  if (gameState == END && keyDown('r')) {
    score = 0;
    highScore = 0;
  }
  if (gameState === PLAY) {
    knife.visible = true;
    knife.addImage(knifeImage)
    knife.scale = 0.6
    knife.debug = false;
    fruits();
    monsterSpawn();
    fill('black')
    text("Fruit that passed: " + fruitPass, 50, 50)
    if (fruitGroup.isTouching(invisLeft) || fruitGroup.isTouching(invisRight)) {
      fruitGroup.destroyEach();
      fruitPass++
      if (fruitPass > 9) {
        //  gameOverSound.play()
        gameState = END;

        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);

        knife.addImage(gameOverImage);
        knife.scale = 2;
        knife.x = 300;
        knife.y = 300;

      }
    }

    knife.y = World.mouseY;
    knife.x = World.mouseX;


    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      score = score + 1
      // knifeSound.play()
    } else {

      if (monsterGroup.isTouching(knife)) {
        //gameOverSound.play()
        gameState = END;

      }
      if (gameState == END) {
        fruitPass = 0;
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);


        knife.addImage(gameOverImage);
        knife.scale = 2;
        knife.x = 300;
        knife.y = 300;
      }
    }
  }
  if (gameState == END && keyDown('space')) {
    score = 0;
    gameState = PLAY;
  }

  drawSprites();
  fill('black')
  textSize(25);
  text("Score: " + score, 250, 50);
  if (gameState == END) {
    text("Press Space To Restart!", 200, 400)
    textSize(12)
    text("Press R to reset your High Score", 50, 50)
  }
  textSize(25)
  text("High Score: " + highScore, 400, 50);
  if (score > highScore) {
    highScore = score;

  }
}


function monsterSpawn() {
  if (frameCount % 180 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 550));

    monster.velocityX = -(8 + score / 5);
    monster.setLifetime = 50;

    monsterGroup.add(monster);
  }
}

function fruits() {
  if (frameCount % 95 === 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(550, 200, 20, 20);


    if (position == 1) {
      fruit.x = 585;

      fruit.velocityX = -(7 + score / 2)
    } else {
      if (position == 2) {
        fruit.x = 15;


        fruit.velocityX = (7 + score / 2);
      }
    }

    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 550));


    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}