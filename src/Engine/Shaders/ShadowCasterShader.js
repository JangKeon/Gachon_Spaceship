"use strict";

function ShadowCasterShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);  // call SimpleShader constructor

    this.mLight = null;  // The light that casts the shadow
    this.mShaderLight = new ShaderLightAtIndex(this.mCompiledShader, 0);
}
gEngine.Core.inheritPrototype(ShadowCasterShader, SpriteShader);

ShadowCasterShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);
    this.mShaderLight.loadToShader(aCamera, this.mLight);
};

ShadowCasterShader.prototype.setLight = function (l) {
    this.mLight = l;
};