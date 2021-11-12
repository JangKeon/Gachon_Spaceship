"use strict";

function UIRButton(callback, context, position, text, textSize, textColor, aCamera) {
    this.mBack = new SpriteRenderable("assets/UI/radarbutton.png");
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    
    var pixSize=textSize*(aCamera.getViewport()[2]/aCamera.getWCWidth());
    var tPos = [position[0]+pixSize/2+5,position[1]];
    
    this.mText = new UIText(text, 
                            tPos, 
                            textSize, 
                            UIText.eHAlignment.eLeft, 
                            UIText.eVAlignment.eCenter,
                            textColor);
 
    
    UIElement.call(this, this.mBack, position, [20,20]);
    
    //callback management
    this.mCallBack = callback;
    this.mContext = context;
    
    
    this.mHover = false;
    this.mClick = false;
}
gEngine.Core.inheritPrototype(UIRButton, UIElement);

UIRButton.prototype.getText = function() {
    return this.mText;
};

UIRButton.prototype.draw = function (aCamera) {
    UIElement.prototype.draw.call(this, aCamera);
    
    if(this.mText !== null)
        this.mText.draw(aCamera);
};

UIRButton.prototype.update = function () {
    UIElement.prototype.update.call(this);   
    this.mClick = false;
    
    //get the mouse position, and if its over the button
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    var mouseOver = this.getUIBBox().containsPoint(mousePos[0], mousePos[1]);
    
    //start simple, just do callback when clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            var x = this.mBack.getElementUVCoordinateArray();
            if(x[2]!==0||x[0]!==1||x[5]!==0||x[1]!==0.5){
                this.mClick = true;
                this.mBack.setElementUVCoordinate(0.0, 1.0, 0.0, 0.5);
                if(this.mCallBack !== null)
                    this.mCallBack.call(this.mContext);
            }
        }
    }
};

UIRButton.prototype.setTextString = function(text) {
    this.mText.setText(text);
};

UIRButton.prototype.setTextColor = function(color) {
    this.mText.setColor(color);
};

UIRButton.prototype.setTextHeight = function(height) {
    this.mText.setTextHeight(height);
};

UIRButton.prototype.deselect = function(){
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    this.mClick = false;
};

UIRButton.prototype.getClick = function(){
    return this.mClick;
};

UIRButton.prototype._applyUIXform = function(aCamera) {
    var rendXform = this.getXform();
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    rendXform.setPosition(WCPos[0], WCPos[1]);
    var height= this.mText.getXform().getHeight();
    rendXform.setSize(height, height);
    this.mText.getXform().setXPos(this.mText.getXform().getXPos());
    
};