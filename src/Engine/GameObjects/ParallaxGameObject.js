"use strict";   

/**
 * 
 * @param {Renderable} renderableObj Renderable to parallax
 * @param {Number} scale Parallax scale
 * @param {Camera} aCamera Camera to refrence
 * @returns {ParallaxGameObject}
 * @class ParallaxGameObject
 */
function ParallaxGameObject(renderableObj, scale, aCamera) {
    this.mRefCamera = aCamera;
    this.mCameraWCCenterRef = vec2.clone(this.mRefCamera.getWCCenter());
    this.mParallaxScale = 1;
    this.setParallaxScale(scale);
    TiledGameObject.call(this, renderableObj);
}
gEngine.Core.inheritPrototype(ParallaxGameObject, TiledGameObject);

 
ParallaxGameObject.prototype.update = function () {
    // simple default behavior
    this._refPosUpdate(); // check to see if the camera has moved
    var pos = this.getXform().getPosition();  // our own xform
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed() * this.mParallaxScale);
};

ParallaxGameObject.prototype._refPosUpdate = function () {
    // now check for reference movement
    var deltaT = vec2.fromValues(0, 0);
    vec2.sub(deltaT, this.mCameraWCCenterRef, this.mRefCamera.getWCCenter());
    this.setWCTranslationBy(deltaT);
    vec2.sub(this.mCameraWCCenterRef, this.mCameraWCCenterRef, deltaT); // update WC center ref position
};

 
ParallaxGameObject.prototype.setWCTranslationBy = function (delta) {
    var f = (1-this.mParallaxScale);
    this.getXform().incXPosBy(-delta[0] * f);
    this.getXform().incYPosBy(-delta[1] * f);
};

 
ParallaxGameObject.prototype.getParallaxScale = function () {
    return this.mParallaxScale;
};

 
ParallaxGameObject.prototype.setParallaxScale = function(s) {
    if (s <= 0) {
        this.mParallaxScale = 1;
    } else {
        this.mParallaxScale = 1/s;
    }
};