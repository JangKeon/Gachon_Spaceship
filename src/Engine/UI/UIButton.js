"use strict";

function UIButton(buttonSprite, callback, context, position, size, text, textSize, textColor, clickTextColor) {
    this.mBack = new SpriteRenderable(buttonSprite);
    this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
    UIElement.call(this, this.mBack, position, size);
    
    this.mText = new UIText(text, 
                            position, 
                            textSize, 
                            UIText.eHAlignment.eCenter, 
                            UIText.eVAlignment.eCenter,
                            textColor);
    
    //callback management
    this.mCallBack = callback;
    this.mContext = context;
    
    
    this.mHover = false;
    this.mClick = false;
    this.textColor = textColor;
    this.clickTextColor = clickTextColor;
}
gEngine.Core.inheritPrototype(UIButton, UIElement);

UIButton.prototype.getText = function() {
    return this.mText;
};

UIButton.prototype.draw = function (aCamera) {
    UIElement.prototype.draw.call(this, aCamera);
    if(this.mText !== null)
        this.mText.draw(aCamera);
};

UIButton.prototype.update = function () {
    UIElement.prototype.update.call(this);
    var uiXform = this.getUIXform();
   
    //make sure the button text stays on the button
    this.mText.getUIXform().setPosition(uiXform.getXPos(), uiXform.getYPos());
    
    //get the mouse position, and if its over the button
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    var mouseOver = this.getUIBBox().containsPoint(mousePos[0], mousePos[1]);
    

    //start simple, just do callback when clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            this.mClick = true;
            this.mBack.setElementUVCoordinate(0.0, 1.0, 0.0, 0.5);
            this.setTextColor(this.clickTextColor);
        }
    }
    
    if(gEngine.Input.isButtonReleased(gEngine.Input.mouseButton.Left)){
        if(this.mClick) {
            this.mBack.setElementUVCoordinate(0.0, 1.0, 0.5, 1.0);
            this.mClick = false;
            this.setTextColor(this.textColor);
            
            if(mouseOver){
                if(this.mCallBack !== null)
                    this.mCallBack.call(this.mContext);
            }
        }

    }
};


UIButton.prototype.setTextString = function(text) {
    this.mText.setText(text);
};


UIButton.prototype.setTextColor = function(color) {
    this.mText.setColor(color);
};


UIButton.prototype.setClickTextColor = function(color){
    this.clickTextColor = color;
};


UIButton.prototype.setTextHeight = function(height) {
    this.mText.setTextHeight(height);
};
