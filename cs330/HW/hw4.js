/*
  Homework 4
  Anežka Strnadová
  09/28/2022
  started with Lab09ColorCube.js and homework 3
*/

"use strict";

var canvas;
var gl;

var axis = 0;
var xAxis = 0;
var yAxis =1;
var zAxis = 2;
var theta = [0, 0, 0];
var thetaLoc;
var flag = false;
var numElements = 160;
var t = 0.0;
var tLoc;
var morph = false;
var increase = 0.01;
var color = vec4(0.0, 0.0, 1.0, 1.0);

//Define the shape of the letter U
var vertices_u = [
    //front side
    vec3(-0.5, 0.5, 0.25),
    vec3(-0.2, 0.5, 0.25),
    vec3(-0.2, 0.25, 0.25),
    vec3(-0.2, -0.25, 0.25),
    vec3(0.2, -0.25, 0.25),
    vec3(0.2, 0.25, 0.25),
    vec3(0.2, 0.5, 0.25),
    vec3(0.5, 0.5, 0.25),
    vec3(0.5, 0.25, 0.25), 
    vec3(0.5, 0.25, 0.25),
    vec3(0.5, -0.25, 0.25),
    vec3(0.5, -0.25, 0.25),
    vec3(0.5, -0.5, 0.25),
    vec3(0.2, -0.5, 0.25),
    vec3(-0.2, -0.5, 0.25),
    vec3(-0.5, -0.5, 0.25),
    vec3(-0.5, -0.25, 0.25),
    vec3(-0.5, -0.25, 0.25),
    vec3(-0.5, 0.25, 0.25),
    vec3(-0.5, 0.25, 0.25),

    //back side
    vec3(-0.5, 0.5, -0.25),
    vec3(-0.2, 0.5, -0.25),
    vec3(-0.2, 0.25, -0.25),
    vec3(-0.2, -0.25, -0.25),
    vec3(0.2, -0.25, -0.25),
    vec3(0.2, 0.25, -0.25),
    vec3(0.2, 0.5, -0.25),
    vec3(0.5, 0.5, -0.25),
    vec3(0.5, 0.25, -0.25), 
    vec3(0.5, 0.25, -0.25),
    vec3(0.5, -0.25, -0.25),
    vec3(0.5, -0.25, -0.25),
    vec3(0.5, -0.5, -0.25),
    vec3(0.2, -0.5, -0.25),
    vec3(-0.2, -0.5, -0.25),
    vec3(-0.5, -0.5, -0.25),
    vec3(-0.5, -0.25, -0.25),
    vec3(-0.5, -0.25, -0.25),
    vec3(-0.5, 0.25, -0.25),
    vec3(-0.5, 0.25, -0.25),
    ];

//Define the shape of the letter I
var vertices_i = [
    //front side
    vec3(-0.5, 0.5, 0.25),
    vec3(-0.2, 0.5, 0.25),
    vec3(-0.2, 0.5, 0.25),
    vec3(-0.2, 0.5, 0.25),
    vec3(0.2, 0.5, 0.25),
    vec3(0.2, 0.5, 0.25),
    vec3(0.2, 0.5, 0.25),
    vec3(0.5, 0.5, 0.25),
    vec3(0.5, 0.25, 0.25), 
    vec3(0.2, 0.25, 0.25),
    vec3(0.2, -0.25, 0.25),
    vec3(0.5, -0.25, 0.25),
    vec3(0.5, -0.5, 0.25),
    vec3(0.2, -0.5, 0.25),
    vec3(-0.2, -0.5, 0.25),
    vec3(-0.5, -0.5, 0.25),
    vec3(-0.5, -0.25, 0.25),
    vec3(-0.2, -0.25, 0.25),
    vec3(-0.2, 0.25, 0.25),
    vec3(-0.5, 0.25, 0.25),

    //back side
    vec3(-0.5, 0.5, -0.25),
    vec3(-0.2, 0.5, -0.25),
    vec3(-0.2, 0.5, -0.25),
    vec3(-0.2, 0.5, -0.25),
    vec3(0.2, 0.5, -0.25),
    vec3(0.2, 0.5, -0.25),
    vec3(0.2, 0.5, -0.25),
    vec3(0.5, 0.5, -0.25),
    vec3(0.5, 0.25, -0.25), 
    vec3(0.2, 0.25, -0.25),
    vec3(0.2, -0.25, -0.25),
    vec3(0.5, -0.25, -0.25),
    vec3(0.5, -0.5, -0.25),
    vec3(0.2, -0.5, -0.25),
    vec3(-0.2, -0.5, -0.25),
    vec3(-0.5, -0.5, -0.25),
    vec3(-0.5, -0.25, -0.25),
    vec3(-0.2, -0.25, -0.25),
    vec3(-0.2, 0.25, -0.25),
    vec3(-0.5, 0.25, -0.25),
    ];

//Define colors
var vertexColors = [
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    
];

// indices of the triangles that compise the letters
var indices = [
    //front side
    3, 4, 13, 14, 255,
    16, 11, 12, 15, 255,
    18, 2, 14, 17, 255,
    0, 1, 18, 19, 255,
    5, 9, 10, 13, 255,
    1, 2, 18, 19, 255,
    6, 7, 8, 9, 255,
    6, 8, 9, 5, 255,

    //back side
    23, 24, 33, 34, 255,
    36, 31, 32, 35, 255,
    38, 22, 34, 37, 255,
    20, 21, 38, 39, 255,
    25, 29, 30, 33, 255,
    21, 22, 38, 39, 255,
    26, 27, 28, 29, 255,
    26, 28, 29, 25, 255,

    //left
    6, 26, 24, 4, 255,
    16, 36, 35, 15, 255, 
    0, 20, 39, 19, 255,
    18, 38, 37, 17, 255,

    //right
    1, 21, 23, 3, 255,
    7, 27, 28, 8, 255,
    11, 31, 32, 12, 255,
    9, 29, 30, 10, 255,

    //up
    0, 20, 21, 1, 255,
    3, 23, 24, 4, 255,
    6, 26, 27, 7, 255,
    10, 30, 31, 11, 255,
    16, 36, 37, 17, 255,

    //down
    15, 35, 32, 12, 255,
    9, 29, 28, 8,  255,
    19, 39, 38, 18, 255,
];

init();

function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.PRIMITIVE_RESTART_FIXED_INDEX);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // vertex array attribute buffer
    var v2Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, v2Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices_i), gl.STATIC_DRAW);

    var iPosition = gl.getAttribLocation(program, "iPosition");
    gl.vertexAttribPointer(iPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(iPosition);

    // array element buffer

    var uBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, uBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    // vertex array attribute buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices_u), gl.STATIC_DRAW);

    var uPosition = gl.getAttribLocation( program, "uPosition");
    gl.vertexAttribPointer(uPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(uPosition );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    thetaLoc = gl.getUniformLocation(program, "uTheta");
    tLoc = gl.getUniformLocation( program, "t" );


    //event listeners for buttons
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};

    // button listener here
   document.getElementById("Morph").onclick = function () {
    morph = !morph;};
    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    t += (morph ? increase : 0.0);
    if (t.toFixed(2) <= 0.0 || t.toFixed(2) >= 1.0){
        increase = -increase;
    }
    
    gl.uniform1f(tLoc, t);

    if(flag) theta[axis] += 0.5;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawElements(gl.TRIANGLE_FAN, numElements, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(render);
}
