"use strict";

function UIHealthBar(sprite, position, size, buffer) {
    this.mBack = new SpriteRenderable(sprite);
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    UIElement.call(this, this.mBack, position, size);
    
    this.mBuffer = buffer;
    
    this.mMaxHP = 100;
    this.mCurHP = this.mMaxHP;
    
    
    this.mHPElem = new UISprite(sprite, position, size, [0.0, 1.0, 0.0, 0.5]);
};
gEngine.Core.inheritPrototype(UIHealthBar, UIElement);

UIHealthBar.prototype.draw = function(aCamera) {
  UIElement.prototype.draw.call(this, aCamera);
  this.mHPElem.draw(aCamera);
};

UIHealthBar.prototype.update = function() {
    UIElement.prototype.update.call(this);
    
    var s = this.getUIXform().getSize();
    var p = this.getUIXform().getPosition();
    this.mHPElem.getUIXform().setSize((s[0] - 2*this.mBuffer) * (this.mCurHP / this.mMaxHP), s[1] - 2*this.mBuffer);
    
    //left align
    this.mHPElem.getUIXform().setPosition(p[0] - s[0]/2 + this.mBuffer + (this.mHPElem.getUIXform().getSize()[0]/2), p[1]);
    this.mHPElem.update();
};

UIHealthBar.prototype.setMaxHP = function(hp) {
    if(hp > 0)
        this.mMaxHP = hp;  
};

UIHealthBar.prototype.setCurrentHP = function(hp) {
    if(hp < 0)
        this.mCurHP = 0;
    else
        this.mCurHP = hp;
};

UIHealthBar.prototype.getMaxHP = function() {
    return this.mMaxHP;
};

UIHealthBar.prototype.getCurrentHP = function() {
    return this.mCurHP;
};

UIHealthBar.prototype.incCurrentHP = function(hp) {
    if(this.mCurHP + hp > this.mMaxHP)
        this.mCurHP = this.mMaxHP; 
    else if(this.mCurHP + hp < 0)
        this.mCurHP = 0;
    else
        this.mCurHP = this.mCurHP + hp;
};