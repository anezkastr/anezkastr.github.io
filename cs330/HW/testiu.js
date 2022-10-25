"use strict";

var canvas;
var gl;

var numPositions  = 36;

var positions = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0];

var thetaLoc;

var flag = false;

var morph = false;

var Param = 0.0;
var tParamLoc;

var vertices = [
    vec3(-0.5, -0.5, 0.5),
    vec3(-0.5, 0.5, 0.5),
    vec3(0.5, 0.5, 0.5),
    vec3(0.5, -0.5, 0.5),
    vec3(-0.5, -0.5, -0.5),
    vec3(-0.5, 0.5, -0.5),
    vec3(0.5, 0.5, -0.5),
    vec3(0.5, -0.5, -0.5)
];

var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(1.0, 1.0, 1.0, 1.0),  // white
    vec4(0.0, 1.0, 1.0, 1.0)   // cyan
];

// indices of the 12 triangles that compise the cube

var indices = [
    1, 0, 3, 2, 255,
    2, 3, 15, 14, 255,
    14, 15, 12, 13, 255,
    13, 12, 0, 1, 255,
    0, 12, 15, 3, 255,
    1, 13, 14, 2, 255,
    4, 5, 6, 7, 255,
    7, 6, 18, 19, 255,
    4, 5, 17, 16, 255,
    16, 17, 18, 19, 255,
    8, 20, 23, 11, 255,
    8, 9, 10, 11, 255,
    11, 10, 22, 23, 255,
    20, 21, 22, 23, 255,
    8, 9, 10, 11, 255,
    9, 21, 22, 10
];

init();

function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // array element buffer

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // vertex array attribute buffer

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    var positionLoc = gl.getAttribLocation( program, "aPosition");
   gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc );

    // color array atrribute buffer

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    /*
        var bufferu = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferu);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(U), gl.STATIC_DRAW);
    
        var upositionLoc = gl.getAttribLocation(program, "uPosition");
        gl.vertexAttribPointer(upositionLoc, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(upositionLoc);
    */
    thetaLoc = gl.getUniformLocation(program, "uTheta");

    //event listeners for buttons

    document.getElementById("xButton").onclick = function () {
        axis = xAxis;
    };
    document.getElementById("yButton").onclick = function () {
        axis = yAxis;
    };
    document.getElementById("zButton").onclick = function () {
        axis = zAxis;
    };
    document.getElementById("ButtonT").onclick = function () { flag = !flag; };

    document.getElementById("Morph").onclick = function () {
        morph = !morph;
    };

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (flag) theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    if (morph) {
        Param += 0.015 * deltaT;
        if (Param >= 1.0 || Param <= 0.0) {
            deltaT = -deltaT;
        }
    }

    gl.uniform1f(tParamLoc, Param);

    gl.drawElements(gl.TRIANGLE_FAN, numPositions, gl.UNSIGNED_BYTE, 0);

    requestAnimationFrame(render);
}

