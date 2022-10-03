"use strict";
var gl;
var points;
init();

function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }

    points=[
    vec2( -0.95 , -0.95 ),
    vec2(  0.00 , -0.55 ),
    vec2(  0.85 , -0.85 ),
    vec2(  0.75 , -0.25 ),
    vec2(  0.25 ,  0.25 ),
    vec2( -0.35 , -0.65 ),
    vec2( -0.75 ,  0.45 ),
    vec2(  0.00 ,  0.75 ),
    vec2( -0.35 ,  0.45 )
    ];
    
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc , 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLoc );

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    //gl.drawArrays( gl.POINTS, 0, points.length );
    //draw points

    //gl.drawArrays( gl.LINES, 0, points.length );
    //draw many short lines (between first and second point, between third and fourth point, ...)

    //gl.drawArrays( gl.LINE_STRIP, 0, points.length );
    //connect first point with the second, second with the third, third with the fourth, ... 
    //don´t connect the last one with the first one

    //gl.drawArrays( gl.LINE_LOOP, 0, points.length );
    //connect all points with a line and the last one with the first one

    //gl.drawArrays( gl.TRIANGLES, 0, points.length );
    //create triangles for 3 following points
    //the first, the second and the third point create the first triangle
    //the fourth, the fifth and the sixth point create the second triangle... 

    //gl.drawArrays( gl.TRIANGLE_STRIP, 0, points.length );
    //create first triangle and then create another one using last 2 points of the first triangle and a new point

    gl.drawArrays( gl.TRIANGLE_FAN, 0, points.length );
    //first point is fixed and all triangles will start in this point

    /*Do you notice any issues with fill for the triangle fan and triangle strip? Why?
    I noticed that when there are lines crossing each other, there can be a problem with the filling. 
    */
}