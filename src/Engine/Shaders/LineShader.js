"use strict";

function LineShader(vertexShaderPath, fragmentShaderPath) {
    // Call super class constructor
    SimpleShader.call(this, vertexShaderPath, fragmentShaderPath);

    this.mPointSizeRef = null;
    var gl = gEngine.Core.getGL();

    // point size uniform
    this.mPointSizeRef = gl.getUniformLocation(this.mCompiledShader, "uPointSize");

    this.mPointSize = 1;
}
gEngine.Core.inheritPrototype(LineShader, SimpleShader);

LineShader.prototype.activateShader = function (pixelColor, aCamera) {
    // first call the super class's activate
    SimpleShader.prototype.activateShader.call(this, pixelColor, aCamera);

    // now our own functionality: enable texture coordinate array
    var gl = gEngine.Core.getGL();
    gl.uniform1f(this.mPointSizeRef, this.mPointSize);
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLLineVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // each element is a 3-float (x,y.z)
        gl.FLOAT,       // data type is FLOAT
        false,          // if the content is normalized vectors
        0,              // number of bytes to skip in between elements
        0);

    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
};

LineShader.prototype.setPointSize = function (w) { this.mPointSize = w; };