var isKeyPressed = [];

function SpriteMock()
{
    this.gotoAndPlay = function(){}; //used in player
}

QUnit.module("playerTests");

QUnit.test("player doesn't move if on terrain", function(assert) {
    var player = new Player(0, 0, new SpriteMock());
    var terrain = new Terrain(testLevel);
    terrain.obstaclesBBs.push(new createjs.Rectangle(0, 0, 400, 40));

    player.update({delta: 100}, terrain);

    assert.equal(player.verticalVelocity, 0);
    closeEnough(assert, player.internal.y, 0); //actually Y moves a bit because of epsilon buffer
});

QUnit.test("test jump height", function(assert) {
    var player = new Player(0, 0, new SpriteMock());
    var expectedHeight = player.jumpHeight;
    var terrain = new Terrain(testLevel);
    terrain.obstaclesBBs.push(new createjs.Rectangle(0, 0, 400, 40));
    player.update({delta: 100}, terrain); //let player settle on ground
    isKeyPressed[38] = true; //press jump key

    for(var i = 0; i < 100; i++) {
        player.update({delta: 25}, terrain);

        if(Math.abs(player.verticalVelocity) < 10){
            var actual = player.internal.y;
            var expected = -expectedHeight;
            assert.ok(Math.abs(actual-expected) < 1, "expected " + expected + " +-" + 1 + " got " + actual);
            break;
        }
    }
});
QUnit.test("test jump length", function(assert) {
    var player = new Player(0, 0, new SpriteMock());
    var expectedLength = player.jumpLength;
    var terrain = new Terrain(testLevel);
    terrain.obstaclesBBs.push(new createjs.Rectangle(0, 0, 400, 40));
    player.update({delta: 100}, terrain); //let player settle on ground
    isKeyPressed[38] = true; //press jump key
    isKeyPressed[39] = true; //press forward key

    for(var i = 0; i < 100; i++) {
        player.update({delta: 25}, terrain);

        if(player.onGround){
            var actual = player.internal.x;
            var expected = expectedLength;
            assert.ok(Math.abs(actual-expected) < 3, "expected " + expected + " +-" + 3 + " got " + actual);
            break;
        }
    }
});

QUnit.test("movement stays consistent if the game lags", function(assert) {
    var p1 = new Player(0, 0, new SpriteMock());
    var p2 = new Player(0, 0, new SpriteMock());
    var p3 = new Player(0, 0, new SpriteMock());
    var terrain = new Terrain(testLevel);
    terrain.obstaclesBBs.push(new createjs.Rectangle(0, 0, 400, 40));

    p1.update({delta: 100}, terrain); //let all players settle on ground
    p2.update({delta: 100}, terrain); //let all players settle on ground
    p3.update({delta: 100}, terrain); //let all players settle on ground
    isKeyPressed[38] = true; //press jump key
    isKeyPressed[39] = true; //press forward key

    p1.update({delta: 500}, terrain); //p1 is running at 2fps
    for(var i = 0; i < 5; i++)
        p2.update({delta: 100}, terrain); //p2 is running at 10fps
    for(var j = 0; j < 30; j++)
        p3.update({delta: 1000/60}, terrain); //p3 is running at 60fps

    //now all 3 have simulated half a second, they should be at the same point
    closeEnough(assert, p1.internal.x, p2.internal.x);
    closeEnough(assert, p1.internal.y, p2.internal.y);
    closeEnough(assert, p2.internal.x, p3.internal.x);
    closeEnough(assert, p2.internal.y, p3.internal.y);
});
//this is a bit of a lie, because the updating of the vertical velocity is not consistent
//adding a fast frame for all 3 players makes their Y coordinate take a lot of deviation
//though if the framerate stays pretty much constant, the game will be (almost) the same for all 3 players.
