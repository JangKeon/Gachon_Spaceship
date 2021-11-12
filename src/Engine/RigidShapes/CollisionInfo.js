"use strict";

function CollisionInfo() {
    this.mDepth = 0;
    this.mNormal = vec2.fromValues(0, 0);
    this.mStart = vec2.fromValues(0, 0);
    this.mEnd = vec2.fromValues(0, 0);
    
    this.mLine = new LineRenderable();
    this.mLine.setColor([1, 0, 1, 1]);
    this.mLine.setDrawVertices(true);
    this.mLine.setPointSize(5);
}

CollisionInfo.prototype.setDepth = function (s) {
    this.mDepth = s;
};

CollisionInfo.prototype.setNormal = function (s) {
    this.mNormal = s;
};

CollisionInfo.prototype.getDepth = function () {
    return this.mDepth;
};

CollisionInfo.prototype.getNormal = function () {
    return this.mNormal;
};

CollisionInfo.prototype.getStart = function () {
    return this.mStart;
};

CollisionInfo.prototype.getEnd = function () {
    return this.mEnd;
};

CollisionInfo.prototype.setInfo = function (d, n, s) {
    this.mDepth = d;
    this.mNormal[0] = n[0];
    this.mNormal[1] = n[1];
    this.mStart[0] = s[0];
    this.mStart[1] = s[1];
    vec2.scaleAndAdd(this.mEnd, s, n, d);
};

CollisionInfo.prototype.changeDir = function () {
    vec2.scale(this.mNormal, this.mNormal, -1);
    var n = this.mStart;
    this.mStart = this.mEnd;
    this.mEnd = n;
};

CollisionInfo.prototype.draw = function(aCamera) {
    this.mLine.setFirstVertex(this.mStart[0], this.mStart[1]);
    this.mLine.setSecondVertex(this.mEnd[0], this.mEnd[1]);
    this.mLine.draw(aCamera);
};