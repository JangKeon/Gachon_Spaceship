"use strict";  

function IllumRenderable(myTexture, myNormalMap) {
    LightRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getIllumShader());

    // here is the normal map resource id
    this.mNormalMap = myNormalMap;
    // Normal map texture coordinate will reproduce the corresponding sprite sheet
    this.mMaterial = new Material();
}
gEngine.Core.inheritPrototype(IllumRenderable, LightRenderable);

IllumRenderable.prototype.draw = function (aCamera) {
    gEngine.Textures.activateNormalMap(this.mNormalMap);
    this.mShader.setMaterialAndCameraPos(this.mMaterial, aCamera.getPosInPixelSpace());
    LightRenderable.prototype.draw.call(this, aCamera);
};

IllumRenderable.prototype.getMaterial = function () { return this.mMaterial; };
