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

var reloadSpeed = 80;
var moveSpeed = 5;
var enemySpawnSpeed = 75;
var bulletSpeed = 6;

function Enemy()
{
	this.offset = Math.random() * 10;
	this.amplitude = Math.random() * 2 + 0.5;
	this.freq = Math.random()*0.02;
	this.tex = new createjs.Bitmap(imgEnemy);
}

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

var enemyCountdown = 100;

function update()
{
	//move player
	var nextY = Math.min(Math.max(stage.mouseY, 32), stage.canvas.height-32);
	if(Math.abs(nextY - objPlayer.y) < moveSpeed)
		objPlayer.y = nextY;
	else if(nextY - objPlayer.y < 0)
		objPlayer.y -= moveSpeed;
	else
		objPlayer.y += moveSpeed;



	//move bullets forward
	for(i = 0; i < bullets.length; i++)
	{
		bullets[i].x += bulletSpeed;
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
		enemyCountdown = enemySpawnSpeed + 20 * Math.random();
	}

	//move enemies
	for(i = 0; i < enemies.length; i++)
	{
		var e = enemies[i];
		e.tex.x--;
		e.tex.y += Math.sin((e.offset + e.tex.x)*e.freq)*e.amplitude;
	}

	checkCollision();
	reload--;

	stage.update();
}

function checkCollision()
{
	for(i = 0; i < bullets.length; i++)
		for(j = 0; j < enemies.length; j++)
		{
			var e = enemies[j].tex;
			var b = bullets[i];

			ex = e.x + 65;
			ey = e.y + 61;
			bx = b.x + 32;
			by = b.y + 32;

			var radius = 60;
			if((ex-bx)*(ex-bx) + (ey-by)*(ey-by) < radius*radius)
			{
				bullets.splice(i, 1);
				enemies.splice(j, 1);
				stage.removeChild(b);
				stage.removeChild(e);

				reloadSpeed *= 0.95;
				moveSpeed *= 1.05;
				enemySpawnSpeed *= 0.95;
				bulletSpeed *= 1.05;

				i--;
				break; //stop processing enemies for this bullet
			}
		}
}

var reload = 0;

function fire()
{
	if(reload < 0)
	{
		var nbBullets = bullets.length;
		bullets[nbBullets] = new createjs.Bitmap(imgBullet);
		bullets[nbBullets].x = objPlayer.x;
		bullets[nbBullets].y = objPlayer.y;
		stage.addChild(bullets[nbBullets]);
		reload = reloadSpeed;
	}
}

function spawnEnemy()
{
	var enemy = new Enemy(); //130x122
	enemy.tex.x = stage.canvas.width;
	enemy.tex.y = (Math.random())*400;
	stage.addChild(enemy.tex);
	enemies[enemies.length] = enemy;
}
