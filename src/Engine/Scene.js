"use strict";

function Scene() {}

Scene.prototype.loadScene = function () {
    // override to load scene specific contents
};

Scene.prototype.initialize = function () {
    // initialize the level (called from GameLoop)
};

Scene.prototype.update = function () {
    // when done with this level should call:
    // GameLoop.stop() ==> which will call this.unloadScene();
};

Scene.prototype.draw = function () {};

Scene.prototype.unloadScene = function () {
    // .. unload all resources
};