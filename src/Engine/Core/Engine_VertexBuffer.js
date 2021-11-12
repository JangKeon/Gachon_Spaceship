
"use strict";   

 
var gEngine = gEngine || { };

 
gEngine.VertexBuffer = (function () {
    // reference to the vertex positions for the square in the gl context
    var mSquareVertexBuffer = null;

    // reference to the texture positions for the square vertices in the gl context
    var mTextureCoordBuffer = null;

    // First: define the vertices for a square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

     var textureCoordinates = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];
     var verticesOfLine = [
        0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    // reference to the texture positions for the square vertices in the gl context
    var mLineVertexBuffer = null;

    /**
     * Initilize the Vertex Buffer
     * @memberOf gEngine.VertexBuffer
     * @returns {undefined}
     */
    var initialize = function () {
        var gl = gEngine.Core.getGL();

         // Create a buffer on the gGL context for our vertex positions
        mSquareVertexBuffer = gl.createBuffer();

        // Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

        // Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
        //<editor-fold>

         // Create a buffer on the gGL context for our vertex positions
        mTextureCoordBuffer = gl.createBuffer();

        // Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);

        // Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
        // </editor-fold>

         // Create a buffer on the gGL context for our vertex positions
        mLineVertexBuffer = gl.createBuffer();

        // Connect the vertexBuffer to the ARRAY_BUFFER global gl binding point.
        gl.bindBuffer(gl.ARRAY_BUFFER, mLineVertexBuffer);

        // Put the verticesOfSquare into the vertexBuffer, as non-changing drawing data (STATIC_DRAW)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfLine), gl.STATIC_DRAW);
         
    };

     
    var getGLVertexRef = function () { return mSquareVertexBuffer; };
    
     
    var getGLTexCoordRef = function () { return mTextureCoordBuffer; };
    
     
    var getGLLineVertexRef = function () { return mLineVertexBuffer; };

    
    var cleanUp = function () {
        var gl = gEngine.Core.getGL();
        gl.deleteBuffer(mSquareVertexBuffer);
        gl.deleteBuffer(mTextureCoordBuffer);
        gl.deleteBuffer(mLineVertexBuffer);
    };

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef,
        getGLTexCoordRef: getGLTexCoordRef,
        getGLLineVertexRef: getGLLineVertexRef,
        cleanUp: cleanUp
    };

    return mPublic;
}());