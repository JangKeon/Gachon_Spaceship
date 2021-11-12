"use strict";

function SimpleShader(vertexShaderPath, fragmentShaderPath) {
    this.mCompiledShader = null;
    this.mShaderVertexPositionAttribute = null;
    this.mPixelColor = null;
    this.mModelTransform = null;
    this.mViewProjTransform = null;
    this.mGlobalAmbientColor = null;
    this.mGlobalAmbientIntensity = null;

    var gl = gEngine.Core.getGL();

    // start of constructor code
    this.mVertexShader = this._compileShader(vertexShaderPath, gl.VERTEX_SHADER);
    this.mFragmentShader = this._compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);
    gl.linkProgram(this.mCompiledShader);

    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }

    this.mShaderVertexPositionAttribute = gl.getAttribLocation(
        this.mCompiledShader,
        "aSquareVertexPosition"
    );

    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
    this.mGlobalAmbientColor = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientColor");
    this.mGlobalAmbientIntensity = gl.getUniformLocation(this.mCompiledShader, "uGlobalAmbientIntensity");
}

SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };

SimpleShader.prototype.activateShader = function (pixelColor, aCamera) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, aCamera.getVPMatrix());
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,              // each element is a 3-float (x,y.z)
        gl.FLOAT,       // data type is FLOAT
        false,          // if the content is normalized vectors
        0,              // number of bytes to skip in between elements
        0);             // offsets to the first element
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
    gl.uniform4fv(this.mGlobalAmbientColor, gEngine.DefaultResources.getGlobalAmbientColor());
    gl.uniform1f(this.mGlobalAmbientIntensity, gEngine.DefaultResources.getGlobalAmbientIntensity());
};

SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
    var gl = gEngine.Core.getGL();
        // loads the modelTransform matrix into webGL to be used by the vertex shader
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

SimpleShader.prototype.cleanUp = function () {
    var gl = gEngine.Core.getGL();
    gl.detachShader(this.mCompiledShader, this.mVertexShader);
    gl.detachShader(this.mCompiledShader, this.mFragmentShader);
    gl.deleteShader(this.mVertexShader);
    gl.deleteShader(this.mFragmentShader);
};

SimpleShader.prototype._compileShader = function (filePath, shaderType) {
    var gl = gEngine.Core.getGL();
    var shaderSource = null, compiledShader = null;

    // Step A: Access the shader textfile
    shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);

    if (shaderSource === null) {
        alert("WARNING: Loading of:" + filePath + " Failed!");
        return null;
    }
    compiledShader = gl.createShader(shaderType);

    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
};