var preloadCount = 0;
var preloadTotal = 3;

var imgPlayer = new Image();
var objPlayer;

var imgBg = new Image();
var imgBullet = new Image();

var stage;

var bullets = new Array();
var nbBullets = 0;

function startGame()
{
	preloadAssets();
}

function preloadAssets()
{
	imgPlayer.onload = preloadUpdate();
	imgPlayer.src = "media/joueur.png";

	imgBg.onload = preloadUpdate();
	imgBg.src = "media/bg.jpg";

	imgBullet.onload = preloadUpdate();
	imgBullet.src = "media/Bullet.png";
}

function preloadUpdate()
{
	preloadCount++;
	if(preloadCount == preloadTotal)
		launchGame();
}

function launchGame()
{
	stage = new createjs.Stage(document.getElementById("gameCanvas"));

	var objBg = new createjs.Bitmap(imgBg);
	stage.addChild(objBg);

	objPlayer = new createjs.Bitmap(imgPlayer);
	objPlayer.regX = 64;
	objPlayer.regY = 32;
	objPlayer.x = 70;
	objPlayer.y = 300;
	stage.addChild(objPlayer);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);
	stage.addEventListener("click", fire);
}

var speed = 4

function update()
{
	objPlayer.y = Math.min(Math.max(stage.mouseY, 32), 600-32);

	for(i = 0; i < nbBullets; i++)
	{
		bullets[i].x += 6;
		if(bullets[i].x > 800)
		{
			stage.removeChild(bullets[i]);
			bullets.shift(); //remove first element
			nbBullets--;
			i--;
		}
	}

	stage.update();
}

function fire()
{
	bullets[nbBullets] = new createjs.Bitmap(imgBullet);
	bullets[nbBullets].x = objPlayer.x;
	bullets[nbBullets].y = objPlayer.y;
	stage.addChild(bullets[nbBullets]);
	nbBullets++;
}
