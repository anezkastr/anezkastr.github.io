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
var numElements = 89;

    var vertices_u = [
        vec3(-0.5, 0.5, 0.5),
        vec3(-0.25, 0.5, 0.5),
        vec3(-0.25,-0.25, 0.5),
        vec3(0.25,-0.25, 0.5),
        vec3(0.25,0.5, 0.5),
        vec3(0.5,0.5, 0.5),
        vec3(0.5,-0.5, 0.5),
        vec3(0.1,-0.5, 0.5),
        vec3(-0.1,-0.5, 0.5),
        vec3(-0.5,-0.5, 0.5),
        vec3(-0.5,-0.1, 0.5),
        vec3(-0.5,0.1, 0.5),

        vec3(-0.5, 0.5, -0.5),
        vec3(-0.25, 0.5, -0.5),
        vec3(-0.25,-0.25, -0.5),
        vec3(0.25,-0.25, -0.5),
        vec3(0.25,0.5, -0.5),
        vec3(0.5,0.5, -0.5),
        vec3(0.5,-0.5, -0.5),
        vec3(0.1,-0.5, -0.5),
        vec3(-0.1,-0.5, -0.5),
        vec3(-0.5,-0.5, -0.5),
        vec3(-0.5,-0.1, -0.5),
        vec3(-0.5,0.1, -0.5),
    ];

    var vertices_i = [
        vec3(-0.5, 0.5, 0.5),
        vec3(0.5, 0.5, 0.5),
        vec3(0.5,0.35, 0.5),
        vec3(0.15,0.35, 0.5),
        vec3(0.15,-0.35, 0.5),
        vec3(0.5,-0.35, 0.5),
        vec3(0.5,-0.5, 0.5),
        vec3(-0.5,-0.5, 0.5),
        vec3(-0.5,-0.35, 0.5),
        vec3(-0.15,-0.35, 0.5),
        vec3(-0.15,0.35, 0.5),
        vec3(-0.5, 0.35, 0.5),

        vec3(-0.5, 0.5, -0.5),
        vec3(0.5, 0.5, -0.5),
        vec3(0.5,0.35, -0.5),
        vec3(0.15,0.35, -0.5),
        vec3(0.15,-0.35, -0.5),
        vec3(0.5,-0.35, -0.5),
        vec3(0.5,-0.5, -0.5),
        vec3(-0.5,-0.5, -0.5),
        vec3(-0.5,-0.35, -0.5),
        vec3(-0.15,-0.35, -0.5),
        vec3(-0.15,0.35, -0.5),
        vec3(-0.5, 0.35, -0.5),
    ]

    var vertexColors = [
        vec4(1.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 0.0, 0.0, 1.0),  // yellow
        vec4(1.0, 0.0, 0.0, 1.0),  // green
        vec4(1.0, 0.0, 0.0, 1.0),  // blue
        vec4(1.0, 0.0, 0.0, 1.0),  // magenta
        vec4(1.0, 0.0, 0.0, 1.0),  // white
        vec4(1.0, 0.0, 0.0, 1.0),   // cyan
        vec4(1.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 0.0, 0.0, 1.0),  // yellow
        vec4(1.0, 0.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(0.0, 0.0, 1.0, 1.0),  // magenta
        vec4(0.0, 0.0, 1.0, 1.0),  // white
        vec4(0.0, 0.0, 1.0, 1.0),   // cyan
        vec4(0.0, 0.0, 1.0, 1.0),  // black
        vec4(0.0, 0.0, 1.0, 1.0),  // red
        vec4(0.0, 0.0, 1.0, 1.0),  // yellow
        vec4(0.0, 0.0, 1.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(0.0, 0.0, 1.0, 1.0),  // magenta
        vec4(0.0, 0.0, 1.0, 1.0),  // white
        vec4(0.0, 0.0, 1.0, 1.0) 
    ];

// indices of the 12 triangles that compise the cube

var indices_u = [
    0, 12, 21, 9, 255,
    0, 1, 2, 11, 255,
    3, 4, 5, 6, 255,
    3, 6, 7, 2, 255,
    9, 2, 7, 8, 255,
    11, 2, 9, 10, 255,
    0, 1, 13, 12, 255,
    4, 5, 17, 16, 255,
    9, 6, 18, 21, 255,
    5, 17, 18, 6, 255,
    21, 9, 11, 13, 255,
    0, 12, 13, 11, 255,
    2, 14, 15, 3, 255,
    12, 13, 14, 23, 255,

    15, 16, 17, 18, 255,
    15, 18, 19, 14, 255,
    21, 14, 19, 20, 255,
    23, 14, 21, 22, 255,

];

var indices_i = [
    0, 12, 13, 1, 255,
    1, 13, 14, 2, 255,
    3, 15, 14, 2, 255,
    3, 15, 16, 4, 255,
    4, 16, 17, 5, 255,
    7, 19, 18, 6, 255,
    7, 8, 20, 19, 255,
    8, 20, 21, 9, 255,
    9, 10, 22, 21, 255,
    10, 11, 23, 22, 255,
    11, 0, 12, 23, 255,
    0, 1, 2, 11, 255,
    10, 3, 4, 9, 255,
    8, 5, 6, 7, 255,
    5, 17, 18, 6, 255,
    12, 13, 14, 23, 255,
    22, 15, 16, 21, 255,
    20, 17, 18, 19, 255,

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

    // array element buffer

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices_u), gl.STATIC_DRAW);

    // color array atrribute buffer

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    // vertex array attribute buffer

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices_u), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation( program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc );

    thetaLoc = gl.getUniformLocation(program, "uTheta");

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

    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(flag) theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawElements(gl.TRIANGLE_FAN, numElements, gl.UNSIGNED_BYTE, 0);
    //the more I reduce numElements, the more parts of the cube become transparent

    requestAnimationFrame(render);
}
