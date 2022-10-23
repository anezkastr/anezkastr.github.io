/*
Homework 3
Anežka Strnadová
09/28/2022
started with Lab07RotTriColor.js
*/
"use strict";

var gl;
var il;

var t = 0.0;
var tLoc;

var color = vec4(0.0, 0.0, 1.0, 1.0);
var colorLoc;

var delay = 100;
var morph = false;

var increase = 0.05;

init();

function init()
{
    var canvas = document.getElementById( "gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices_u = [
        vec2(-0.5, 0.5),
        vec2(-0.2, 0.5),
        vec2(-0.2, 0.25),
        vec2(-0.2, -0.25),
        vec2(0.2, -0.25),
        vec2(0.2, 0.25),
        vec2(0.2, 0.5),
        vec2(0.5, 0.5),
        vec2(0.5, 0.25), 
        vec2(0.5, 0.25),
        vec2(0.5, -0.25),
        vec2(0.5, -0.25),
        vec2(0.5, -0.5),
        vec2(0.2, -0.5),
        vec2(-0.2, -0.5),
        vec2(-0.5, -0.5),
        vec2(-0.5, -0.25),
        vec2(-0.5, -0.25),
        vec2(-0.5, 0.25),
        vec2(-0.5, 0.25),
    ];

    var vertices_i = [
        vec2(-0.5, 0.5),
        vec2(-0.2, 0.5),
        vec2(-0.2, 0.5),
        vec2(-0.2, 0.5),
        vec2(0.2, 0.5),
        vec2(0.2, 0.5),
        vec2(0.2, 0.5),
        vec2(0.5, 0.5),
        vec2(0.5, 0.25), 
        vec2(0.2, 0.25),
        vec2(0.2, -0.25),
        vec2(0.5, -0.25),
        vec2(0.5, -0.5),
        vec2(0.2, -0.5),
        vec2(-0.2, -0.5),
        vec2(-0.5, -0.5),
        vec2(-0.5, -0.25),
        vec2(-0.2, -0.25),
        vec2(-0.2, 0.25),
        vec2(-0.5, 0.25),
    ];



    // Load the data into the GPU

    var uBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices_u), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var iPosition= gl.getAttribLocation( program, "iPosition");
    gl.vertexAttribPointer(iPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(iPosition);

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices_i), gl.STATIC_DRAW);

    var uPosition = gl.getAttribLocation( program, "uPosition");
    gl.vertexAttribPointer(uPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(uPosition);

    tLoc = gl.getUniformLocation( program, "t" );
    colorLoc = gl.getUniformLocation(program, "aColor");

    //define the uniform variable in the shader, aColor

   // button listener here
   document.getElementById("Morph").onclick = function () {
    morph = !morph;
};
    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    t += (morph ? increase : 0.0);
    if (t.toFixed(2) <= 0.0 || t.toFixed(2) >= 1.0){
        increase = -increase;
    }
    color = vec4(1.0-t, 1.0-t, 0.0+t, 1.0);
    
    gl.uniform1f(tLoc, t);

    gl.uniform4fv(colorLoc, color);

    gl.drawArrays(gl.LINE_LOOP, 0, 20);

    setTimeout(
        function (){requestAnimationFrame(render);}, delay
    );
}