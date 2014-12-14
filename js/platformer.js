var isKeyPressed = [];

function Player(initX, initY, bitmap)
{
	var self = this; //to use in events

	this.speed = 8;
	this.jumpingPower = 15;

	this.internal = bitmap;
	this.internal.x = initX;
	this.internal.y = initY;

	this.verticalVelocity = 0;

	this.Update = function()
	{
		if(this.internal.y == 360 && isKeyPressed[38])
			this.verticalVelocity = -this.jumpingPower;
		this.internal.y += this.verticalVelocity;

		var move = 0
		if(isKeyPressed[37])
			move += -this.speed;
		if(isKeyPressed[39])
			move += this.speed;
		this.internal.x += move;

		//handle collision with the ground
		if(this.internal.y >= 360 && this.verticalVelocity >= 0)
		{
			this.internal.y = 360;
			this.verticalVelocity = 0;
		}

		if(this.internal.y != 360) //apply gravity only if airborne
			this.verticalVelocity += 1;
	}
}

var preloadCount = 0;
var preloadTotal = 2;

var objPlayer;

var imgPlayer = new Image();
var imgBg = new Image();

var stage;

function startGame()
{
	preloadAssets();
}

function preloadAssets()
{
	imgPlayer.onload = preloadUpdate();
	imgPlayer.src = "media/player.png";

	imgBg.onload = preloadUpdate();
	imgBg.src = "media/bg.jpg";
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

	objPlayer = new Player(50, -40, new createjs.Bitmap(imgPlayer));
	stage.addChild(objPlayer.internal);

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);

	//manage keyboard state
	document.onkeydown = function(e){
	    var key = code(e);
	    isKeyPressed[key] = true;
//		alert(key);
	};
	document.onkeyup = function(e){
	    var key = code(e);
	    isKeyPressed[key] = false;
	};
}

function code(e)
{
	e = e || window.event;
	return(e.keyCode || e.which);
}

function update()
{
	objPlayer.Update();

	stage.update();
}
