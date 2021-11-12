function UIDDButton(position, text, textSize, color, boxColor, callback, context){
    UIText.call(this,text,position,textSize,0,0,color);
    this.box = new Renderable();
    this.offset=textSize/5;
    this.lineOffset=textSize/10;
    this.width=this.mFontRenderable.getXform().getWidth()+this.lineOffset;
    this.mCallBack = callback;
    this.mContext = context;
    this.box.getXform().setPosition(40,30);
    this.box.getXform().setSize(this.width+this.offset,this.mFontRenderable.getXform().getHeight());
    this.box.setColor(boxColor);
    this.box.getXform().setZPos(3);
    this.mActive=false;
}

gEngine.Core.inheritPrototype(UIDDButton,UIText);

UIDDButton.prototype.update = function(aCamera){
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
            if(this.mCallBack !== null)
                this.mCallBack.call(this.mContext);
        }
        else{
            this.mActive = false;
        }
    }
};


UIDDButton.prototype.draw = function(aCamera){
    if(this.mVisible) {
        this._applyUIXform(aCamera);
        this.box.draw(aCamera);
        this.mFontRenderable.draw(aCamera,0);
    }
};


UIDDButton.prototype._applyUIXform = function(aCamera) {
    var rendXform = this.getXform();
    var alignOff = this._getAlignmentOffset();  // takes allignment into consideration
    
    var WCPos = aCamera.VPpixelPosToWC(this.mUIXform.getPosition());
    rendXform.setPosition(WCPos[0] + alignOff[0], WCPos[1] + alignOff[1]+this.lineOffset);
    this.box.getXform().setPosition(WCPos[0] + (this.width)/2, WCPos[1] + alignOff[1]);
    
};

UIDDButton.prototype.setWidth = function(w){
    this.width=w;
    this.box.getXform().setWidth(this.width+this.offset);
};


UIDDButton.prototype.getWidth = function(){
    return this.width;
};


UIDDButton.prototype.getBoxPos = function(){
    return this.box.getXform().getPosition();
};


UIDDButton.prototype.getClick = function(){
    return this.mActive;
};


UIDDButton.prototype.setBoxColor = function(color){
    this.box.setColor(color);
};


UIDDButton.prototype.getBoxColor = function(){
    return this.box.getColor();
};