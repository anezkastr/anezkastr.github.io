/*
Homework 2
Anežka Strnadová
09/16/2022
started with gasket5.js
*/

"use strict";
var gl;
var points;
var colors;
var sliderVal = 0;
var positions;
init();

function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
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
    gl.bufferData( gl.ARRAY_BUFFER, 8*Math.pow(3, 6), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLoc );


    // slider event listener
    document.getElementById("slider").onchange = function(event) {
        sliderVal = parseInt(event.target.value);
        render();
    };
    render();
};

function render() {
    var points=[
        vec2(-1.00,0.00),
        vec2(1.00,0.00),
        ];
    
    positions = [];
    divideLine(points[0], points[1], sliderVal);
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(positions));
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINE_STRIP, 0, positions.length );
    positions = [];
}

function line(a, b){
    positions.push(a, b);
}

function divideLine(a, b, count)
{
    // check for end of recursion
    if (count == 0) {
        line(a, b);
    }
    else {

        //divide the line
        var third = mix(a, b, 1/3);
        var two_thirds = mix(a, b, 2/3);
        --count;

        // find the "top of the mountain"
        divideLine(a, third, count);
        var len = two_thirds[0] - third[0];
        var top = vec2(third[0] + len/2, a[1] + len * Math.sqrt(3)/2);
        positions.push(top);
        divideLine(two_thirds, b, count);
    }
}