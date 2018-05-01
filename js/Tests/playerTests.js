var isKeyPressed = [];

function SpriteMock()
{
    this.gotoAndPlay = function(){}; //used in player
}

QUnit.test("player doesn't move if on terrain", function(assert) {
    var player = new Player(0, -53, new SpriteMock());
    var terrain = new Terrain(testLevel);
    terrain.obstaclesBBs.push(new createjs.Rectangle(0, 0, 400, 40));

    player.update({delta: 100}, terrain);

    assert.equal(player.verticalVelocity, 0);
    closeEnough(assert, player.internal.y, -53); //actually Y moves a bit because of epsilon buffer
});