var isKeyPressed = [];

var preloadCount = 0;
var preloadTotal;

var objPlayer;
var objTerrain;
var BLOCK_SIZE;

var assets = [];

var stage;

//percentage of the screen we try to keep around the player (if it enters it we move the background)
//0.5 means the player is always in the center
var viewBuffer = 0.3;

function startGame()
{
	stage = new createjs.Stage("gameCanvas");
	var text = new createjs.Text("Loading...");
	text.x = stage.canvas.width/2; text.y = stage.canvas.height/2;
	text.textAlign = "center"; text.textBaseline = "middle";
	stage.addChild(text);
	stage.update();

	preloadAssets();
}

function preloadAssets()
{
	var images = [
		"junglechar",
		"bg",
		"crate",
		"debug",
	];
	preloadTotal = images.length + 1; //+1 for the sound
	for(var f of images){
		var img = new Image();
		img.onload = preloadUpdate;
		img.src = "media/" + f + ".png";
		assets[f] = img;
	}

	createjs.Sound.addEventListener("fileload", preloadUpdate);
	createjs.Sound.registerSound("media/receive.wav", "jump", 4);
}

function preloadUpdate()
{
	preloadCount++;
	if(preloadCount === preloadTotal)
		launchGame();
}

function launchGame()
{
	stage.removeChildAt(0); //loading text
	var level = level1;

	var objBg = new createjs.Bitmap(assets["bg"]);
	stage.addChild(objBg);

	BLOCK_SIZE = assets["crate"].width;
	objTerrain = new Terrain(level.map);
	objTerrain.load(stage, assets["crate"]);

	var spSheet = new createjs.SpriteSheet({
			images: [assets["junglechar"]], //art from https://jesse-m.itch.io/jungle-pack
			//regX in the middle of the sprite to allow turning left and right by just flipping scaleX
			frames: {height: 70, width: 42, regX: 21, regY: 70},
			animations: {
				run: [0, 7, "run", 0.4] ,
				jumpup: 10,
				jumpdown: 9,
				still: [12, 23, "still", 0.4]
			},
		});
	var sprite = new createjs.Sprite(spSheet, "run");
	objPlayer = new Player(level.startPos.x, level.startPos.y, sprite);
	stage.addChild(objPlayer.internal);

	createjs.Ticker.framerate = 30;
	createjs.Ticker.addEventListener("tick", update);

	//manage keyboard state
	document.onkeydown = function(e){
		var key = code(e);
		isKeyPressed[key] = true;
		//alert(key);
	};
	document.onkeyup = function(e){
		var key = code(e);
		isKeyPressed[key] = false;
	};
}

function code(e)
{
	e = e || window.event;
	return e.key;
}

function update(event)
{
	objPlayer.update(event, objTerrain);

	stage.update();
}
