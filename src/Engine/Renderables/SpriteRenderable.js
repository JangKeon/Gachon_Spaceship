"use strict";  
function SpriteRenderable(myTexture) {
    TextureRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getSpriteShader());
    this.mTexLeft = 0.0;   // bounds of texture coordinate (0 is left, 1 is right)
    this.mTexRight = 1.0;  
    this.mTexTop = 1.0;    //   1 is top and 0 is bottom of image
    this.mTexBottom = 0.0; 

    this._setTexInfo();
}
gEngine.Core.inheritPrototype(SpriteRenderable, TextureRenderable);

SpriteRenderable.eTexCoordArray = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
});

SpriteRenderable.prototype.setElementUVCoordinate = function (left, right, bottom, top) {
    this.mTexLeft = left;
    this.mTexRight = right;
    this.mTexBottom = bottom;
    this.mTexTop = top;
    this._setTexInfo();
};

SpriteRenderable.prototype.setElementPixelPositions = function (left, right, bottom, top) {
    var imageW = this.mTextureInfo.mWidth;
    var imageH = this.mTextureInfo.mHeight;

    this.mTexLeft = left / imageW;
    this.mTexRight = right / imageW;
    this.mTexBottom = bottom / imageH;
    this.mTexTop = top / imageH;
    this._setTexInfo();
};

SpriteRenderable.prototype.getElementUVCoordinateArray = function () {
    return [
        this.mTexRight,  this.mTexTop,          // x,y of top-right
        this.mTexLeft,   this.mTexTop,
        this.mTexRight,  this.mTexBottom,
        this.mTexLeft,   this.mTexBottom
    ];
};

SpriteRenderable.prototype.draw = function (aCamera) {
    // set the current texture coordinate
    // activate the texture

    this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
    TextureRenderable.prototype.draw.call(this, aCamera);
};
