"use strict";

function UIRadio(callback, context, position, text, textSize, textColor, aCamera){
    this.click = -1;
    this.size=textSize;
    this.basePosition=position;
    GameObjectSet.call(this);
    this.addToSet(callback, context, text, textColor, aCamera);
}

gEngine.Core.inheritPrototype(UIRadio, GameObjectSet);

UIRadio.prototype.update = function(){
    this.click = -1;
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
    }
    for (i = 0; i < this.mSet.length; i++) {
        if(this.mSet[i].getClick()===true){this.click=i;}
    }
    if(this.click>=0){
        for(i=0; i < this.mSet.length; i++){
            if(i!==this.click){this.mSet[i].deselect();}
        }
    }
};

UIRadio.prototype.addToSet = function (callback, context, text, textColor, aCamera){
    var ypos=this.basePosition[1];
    var pixSize=this.size*(aCamera.getViewport()[2]/aCamera.getWCWidth());
    ypos=ypos-(pixSize*(this.mSet.length));
    var pos=[this.basePosition[0],ypos];
    var u = new UIRButton(callback, context, pos, text, this.size, textColor, aCamera);
    this.mSet.push(u);
};