"use strict";

function LevelOne()
{
    BaseScene.call(this);
    this.mWin = false;
    this.mSpawnManager = null;
    
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(LevelOne, BaseScene);


LevelOne.prototype.loadScene = function ()
{
    BaseScene.prototype.loadScene.call(this);
};

LevelOne.prototype.unloadScene = function ()
{
    BaseScene.prototype.unloadScene.call(this);
    var nextLevel = new LoseScreen(); 
    if(this.mEnemies.length == 0){
        nextLevel = new LevelTwo(); 
    }
    gEngine.Core.startScene(nextLevel);
};


LevelOne.prototype.initialize = function () {
   BaseScene.prototype.initialize.call(this);

        // Create Player Ship
    this.initializePlayer(40, 50);

    // create the tiled background
    this.intializeBackground();
    
    var gray = new GrayEnemy(this.kSpriteSheet, 0, 0);
    var killTime = 1400;
    var upperQty = 10;
    var upperRad = 40;
    var startTime = 1000;
    var startTime2 = startTime + Math.floor(killTime * upperQty * 3 / 4);
    var startTime3 = startTime2 + Math.floor(killTime * upperQty / 2 * 3 / 4);
    var spawner1 = new Spawner(gray, Date.now(), startTime, killTime, upperQty, upperRad, false);
    var spawner2 = new Spawner(gray, Date.now(), startTime2, killTime * 2,Math.floor(upperQty/2), upperRad/2, false);
    var spawner3 = new Spawner(gray, Date.now(), startTime3, killTime * 4, Math.floor(upperQty/4), upperRad/4, false);
    this.mSpawnManager = new SpawnManager(spawner1);
    this.mSpawnManager.addSpawner(spawner2);
    this.mSpawnManager.addSpawner(spawner3);
    
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(-23, 1);
    this.mMsg.setTextHeight(4);
};

LevelOne.prototype.spawnEnemy = function ()
{
    var enemy = new GrayEnemy(this.kSpriteSheet, 10, 10);
    var enemy1 = new LightEnemy(this.kSpriteSheet, 80, 80);
    enemy1.toggleDrawRenderable();
    this.applyAllLights(enemy1.getRenderable());

    enemy1.setVisibility(true);

    this.mEnemies.push(enemy);
    
    this.mEnemies.push(enemy1);
}

LevelOne.prototype.draw = function ()
{
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]); // clear to light gray
    this.drawMainCam();
    this.mMsg.draw(this.mCamera);
    this.drawMiniMap();
    this.drawStats();
};


LevelOne.prototype.update = function ()
{
    BaseScene.prototype.update.call(this);
    
    if(!this.mShip.isAlive()){
       gEngine.GameLoop.stop();
    }
    
    
    // enemies, currTime, center
    let shipPos = this.mShip.getRenderable().getXform().getPosition();
    this.mWin = this.mSpawnManager.update(this.mEnemies, Date.now(), shipPos, this.mGlobalLightSet) && this.mEnemies.length == 0;
    if(this.mWin) {
        console.log("win!");
         gEngine.GameLoop.stop();
    }
    this.mMsg.getXform().setPosition(shipPos[0], shipPos[1] - 5);
    var time = Date.now();
    
};