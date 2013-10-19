var preloadCount = 0;
var preloadTotal = 4;

var objPlayer;

var imgPlayer = new Image();
var imgBg = new Image();
var imgBullet = new Image();
var imgEnemy = new Image();

var stage;

var bullets = new Array();
var enemies = new Array();

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

	imgEnemy.onload = preloadUpdate();
	imgEnemy.src = "media/ovni.png";
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

	spawnEnemy();

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);
	stage.addEventListener("click", fire);
}

var enemyCountdown = 30;

function update()
{
	//mouve player
	objPlayer.y = Math.min(Math.max(stage.mouseY, 32), stage.canvas.height-32);

	//move bullets forward
	for(i = 0; i < bullets.length; i++)
	{
		bullets[i].x += 6;
		if(bullets[i].x > stage.canvas.width)
		{
			stage.removeChild(bullets[i]);
			bullets.shift(); //remove first element
			i--;
		}
	}

	//spawn enemies
	if(enemyCountdown > 0)
		enemyCountdown--;
	else
	{
		spawnEnemy();
		enemyCountdown = 30;
	}

	//move enemies
	for(i = 0; i < enemies.length; i++)
	{
		enemies[i].x--;
		enemies[i].y += Math.sin(enemies[i].x*0.08)*5;
	}

	stage.update();
}

function fire()
{
	var nbBullets = bullets.length;
	bullets[nbBullets] = new createjs.Bitmap(imgBullet);
	bullets[nbBullets].x = objPlayer.x;
	bullets[nbBullets].y = objPlayer.y;
	stage.addChild(bullets[nbBullets]);
}

function spawnEnemy()
{
	var enemy = new createjs.Bitmap(imgEnemy); //130x122
	enemy.x = stage.canvas.width - 130;
	enemy.y = (Math.random())*400;
	stage.addChild(enemy);
	enemies[enemies.length] = enemy;
}
