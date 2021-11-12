"use strict";

function UITextBox(position, textSize, width, color, textColor, callback, context){
    UIText.call(this,"",position,textSize,0,0,textColor);
    this.box = new Renderable();
    this.box.setColor(color);
    this.width=width;
    this.offset=textSize/5;
    this.lineOffset=textSize/10;
    this.mCallBack = callback;
    this.mContext = context;
    this.box.getXform().setPosition(40,30);
    this.box.getXform().setZPos(3);
    this.box.getXform().setSize(this.width+this.offset+this.lineOffset,textSize);
    this.line = new LineRenderable(4,5,6,7);
    this.mActive=false;
    this.line.setShowLine(false);
    this.line.setDrawVertices(false);
    this.line.getXform().setZPos(3);
    this.line.setColor(textColor);
    this.mEnteredValue="";
    this.timer=0;
}

gEngine.Core.inheritPrototype(UITextBox,UIText);

UITextBox.prototype.update = function(aCamera){
    var xform = this.box.getXform();
    var b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
    
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),
                                gEngine.Input.getMousePosY());
    mousePos = aCamera.VPpixelPosToWC(mousePos);
    var mouseOver = b.containsPoint(mousePos[0], mousePos[1]);
    

    //start simple, just do callback when clicked
    if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
        if(mouseOver){
            this.mActive = true;
            this.line.setShowLine(true);
            this.line.setDrawVertices(true);
        }
        else{
            this.mActive = false;
            this.timer=0;
            this.line.setShowLine(false);
            this.line.setDrawVertices(false);
        }
    }
    if(this.mActive===true){
        this.keyCheck();
        this.timer++;
        if(this.timer===30){
            this.timer=0;
            this.line.setShowLine(!(this.line.getShowLine()));
            this.line.setDrawVertices(!(this.line.getDrawVertices()));
        }
    }
};

UITextBox.prototype.draw = function(aCamera){
    if(this.mVisible) {
        this._applyUIXform(aCamera);
        this.box.draw(aCamera);
        var offset=this.mFontRenderable.getWidth()-this.width;
        if(offset>0){
            this.mFontRenderable.draw(aCamera,offset);
        }
        else{
            this.mFontRenderable.draw(aCamera,0);
        }
        this.line.draw(aCamera);
    }
};

UITextBox.prototype.keyCheck = function(){
    var txt = this.getText();
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Backspace)){
        if(txt.length>0){
            this.setText(txt.substring(0,txt.length-1));
        }
    }
    for(var i=gEngine.Input.keys.Space; i<=gEngine.Input.keys.Z; i++){
        if(gEngine.Input.isKeyClicked(i)){
            this.setText(txt+""+String.fromCharCode(i));
        }
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
        this.mEnteredValue=this.getText();
        if(this.mCallBack !== null)
                    this.mCallBack.call(this.mContext);
    }
};

UITextBox.prototype._applyUIXform = function(aCamera) {
    var rendXform = this.getXform();
    var alignOff = this._getAlignmentOffset();  // takes allignment into consideration
    
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    rendXform.setPosition(WCPos[0] + alignOff[0], WCPos[1] + alignOff[1]+this.lineOffset);
    if(offset<=0){
        this.box.getXform().setPosition(WCPos[0] + (this.width+this.offset)/2, WCPos[1] + alignOff[1]);
    }
    else{
        this.box.getXform().setPosition(WCPos[0] + (this.width+this.offset)/2+this.offset, WCPos[1] + alignOff[1]);
    }
    this.box.getXform().setPosition(WCPos[0] + (this.width+this.offset)/2, WCPos[1] + alignOff[1]);
    var offset=this.mFontRenderable.getXform().getWidth()-this.width;
    if(offset<=0)
        this.line.setVertices(WCPos[0]+0+rendXform.getWidth()+this.lineOffset,WCPos[1]+alignOff[1]+rendXform.getHeight()/2,WCPos[0]+0+rendXform.getWidth()+this.lineOffset,WCPos[1]+alignOff[1]-rendXform.getHeight()/2);
    else
        this.line.setVertices(WCPos[0]+this.width+this.mFontRenderable.getSymbolSize()[0]/2-this.lineOffset,WCPos[1]+alignOff[1]+rendXform.getHeight()/2,WCPos[0]+this.width+this.mFontRenderable.getSymbolSize()[0]/2-this.lineOffset,WCPos[1]+alignOff[1]-rendXform.getHeight()/2);
};

UITextBox.prototype.getEnteredValue = function(){
    return this.mEnteredValue;
};