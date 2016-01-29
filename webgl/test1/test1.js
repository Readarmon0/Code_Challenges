var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'attribute float a_PointSize;\n' +
	'void main() {\n' + 
	'	gl_Position = a_Position;\n' + // Coordinates
	'	gl_PointSize = a_PointSize;\n' + // Set the point size
    '}\n';
// Fragment shader program
var FSHADER_SOURCE =
	'void main() {\n' +
	'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the color
	'}\n';
function main() {
	// Retrieve <canvas> element
	var canvas = document.getElementById('webgl');
	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
	if (!gl) {
		console.log('Failed to get the rendering context for WebGL');
		return;
	}
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to initialize shaders.');
		return;
	}
	// Get the storage location of attribute variable
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	// Set vertex position to attribute variable
	gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
	gl.vertexAttrib1f(a_PointSize, 5.0);
	// Set the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);
	// Draw a point
	gl.drawArrays(gl.POINTS, 0, 1);
}

/*
// ClickedPoints.js
// Vertex shader program
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position;\n' +
	'	gl_PointSize = 10.0;\n' +
	'}\n';
// Fragment shader program
// ...
function main() {
	// Retrieve <canvas> element
	var canvas = document.getElementById('webgl');
	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
	// ...
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
	// ...
	}
	// Get the storage location of a a_Position variable
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// ...
	// Register function (event handler) to be called to a mouse press
	canvas.onmousedown = function(ev) {click(ev, gl, canvas, a_Position);};
	// ...
	gl.clear(gl.COLOR_BUFFER_BIT);
}
var g_points = []; // The array for a mouse press
function click(ev, gl, canvas, a_Position) {
	var x = ev.clientX; // x coordinate of a mouse pointer
	var y = ev.clientY; // y coordinate of a mouse pointer
	var rect = ev.target.getBoundingClientRect();
	x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
	y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
	// Store the coordinates to g_points array
	g_points.push(x); g_points.push(y);
	// Clear <canvas>
	// gl.clear(gl.COLOR_BUFFER_BIT);
	var len = g_points.length;
	for (var i = 0; i < len; i += 2) {
		// Pass the position of a point to a_Position variable
		gl.vertexAttrib3f(a_Position, g_points[i], g_poitns[i + 1], 0.0);
		// Draw a point
		gl.drawArrays(gl.POINTS, 0, 1);
	}
}


// MultiPoint.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position;\n' +
	'	gl_PointSize = 10.0;\n' +
	'}\n';
// Fragment shader program
// ...
function main() {
	// ...
	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
	// ...
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		// ...
	}
	// Set the positions of vertices
	var n = initVertexBuffers(gl);
	if (n < 0) {
		console.log('Failed to set the positions of the vertices');
		return;
	}
	// Set the color for clearing <canvas>
	// ...
	// Clear <canvas>
	// ...
	// Draw three points
	gl.drawArrays(gl.POINTS, 0, n); // n is 3
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array([
		0.0, 0.5, -0.5, -0.5, 0.5, -0.5
	]);
	var n = 3; // The number of vertices
	// Create a buffer object
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object ');
		return -1;
	}
	// Bind the buffer object to target
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// Write date into the buffer object
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// ...
	// Assign the buffer object to a_Position variable
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	// Enable the assignment to a_Position variable
	gl.enableVertexAttribArray(a_Position);
	return n;
}


// HelloTriangle.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position;\n' +
	'}\n';
// Fragment shader program
var FSHADER_SOURCE =
	'void main() {\n' +
	'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	'}\n';
function main() {
	// ...
	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
	// ...
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		// ...
	}
	// Set the positions of vertices
	var n = initVertexBuffers(gl);
	// ...
	// Set the color for clearing <canvas>
	// ...
	// Clear <canvas>
	// ...
	// Draw a triangle
	gl.drawArrays(gl.TRIANGLES, 0, n); // n is 3
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array([
		0.0, 0.5, -0.5, -0.5, 0.5, -0.5
	]);
	var n = 3; // The number of vertices	
	// ...
	return n;
}


// TranslatedTriangle.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'uniform vec4 u_translation;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position + u_Translation;\n' +
	'}\n';
// Fragment shader program
// ...
// The translation distance for x, y, and z direction
var Tx = 0.5, Ty = 0.5, Tz = 0.0;
function main() {
	// ...
	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
	// ...
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
	// ...
	}
	// Set the positions of vertices
	var n = initVertexBuffers(gl);
	// ...
	// Pass the translation distance to the vertex shader
	var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
	// ...
	gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);
	// Set the color for clearing <canvas>
	// ...
	// Draw a triangle
	gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array([
	0.0.0, 0.5, -0.5, -0.5, 0.5, -0.5
	]);
	var n = 3; // The number of vertices
	// ...
	return n;
}


// RotatedTriangle.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'uniform float u_CosB, u_SinB;\n' +
	'void main() {\n' +
	'	gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;\n' +
	'	gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;\n' +
	'	gl_Position.z = a_Position.z;\n' +
	'	gl_Position.w = 1.0;\n' +
	'}\n';
// Fragment shader program
// ...
// Rotation angle
var ANGLE = 90.0;
function main() {
	// ...
	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
	// ...
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
	// ...
	}
	// Set the positions of vertices
	var n = initVertexBuffers(gl);
	// ...
	// Pass the data required to rotate the shape to the vertex shader
	var radian = Math.PI * ANGLE / 180.0; // Convert to radians
	var cosB = Math.cos(radian);
	var sinB = Math.sin(radian);
	var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
	var u_SinB = gl.getUnifromLocation(gl.program, 'u_SinB');
	// ...
	gl.uniform1f(u_CosB, cosB);
	gl.uniform1f(u_SinB, sinB);
	// Set the color for clearing <canvas>
	// ...
	// Draw a triangle
	gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array([
	0.0.0, 0.5, -0.5, -0.5, 0.5, -0.5
	]);
	var n = 3; // The number of vertices
	// ...
	return n;
}


// RotatedTriangle_Matrix.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'uniform mat4 u_xformMatrix;\n' +
	'void main() {\n' +
	'	gl_Position = u_xformMatrix * a_Position;\n' +
	'}\n';
// Fragment shader program
// ...
// Rotation angle
var ANGLE = 90.0;
function main() {
	// ...
	// Set the positions of vertices
	var n = initVertexBuffers(gl);
	// ...
	// Create a rotation matrix
	var radian = Math.PI * ANGLE / 180.0; // Convert to radians
	var cosB = Math.cos(radian), sinB = Math.sin(radian);
	// Note: WebGL is column major order
	var xformMatrix = new Float32Array([
		cosB, sinB, 0.0, 0.0,
		-sinB, cosB, 0.0, 0.0,
		0.0, 0.0, 1.0, 0.0,
		0.0, 0.0, 0.0, 1.0
		]);
	// Pass the rotation matrix to the vertex shader
	var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
	// ...
	gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
	// Set the color for clearing <canvas>
	// ...
	// Draw a triangle
	gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array([
	0.0.0, 0.5, -0.5, -0.5, 0.5, -0.5
	]);
	var n = 3; // The number of vertices
	// ...
	return n;
}


// RotatedTranslatedTriangle.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'uniform mat4 u_ModelMatrix;\n' +
	'void main() {\n' +
	'	gl_Position = u_ModelMatrix * a_Position;\n' +
	'}\n';
// Fragment shader program
// ...
function main() {
	// ...
	// Set the positions of vertices
	var n = initVertexBuffers(gl);
	// ...
	// Create Matrix4 object for model transformation
	var modelMatrix = new Matrix4();
	// Calculate a model matrix
	var ANGLE = 60.0; // Rotation angle
	varTx = 0.5; // Translation distance
	modelMatrix.setRotate(ANGLE, 0, 0, 1); // Set rotation matrix
	modelMatrix.translate(Tx, 0, 0); // Multiply modelMatrix by the 
	// calculated translation matrix
	// Pass the model matrix to the vertex shader
	var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	// ...
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	// ...
	// Draw a triangle
	gl.drawArrays(gl.TRIANGLES, 0, N);
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array([
		0.0, 0.3, -0.3, -0.3, 0.3, -0.3
	]);
	var n = 3; // The number of vertices
	// ...
	return n;
}


// RotatingTriangle.js
// Vertex shader program
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'uniform mat4 u_ModelMatrix;\n' +
	'void main() {\n' +
	'	gl_Position = u_ModelMatrix * a_Position;\n' +
	'}\n';
// Fragment shader program
// ...
// Rotation angle (degrees/second)
var ANGLE_STEP = 45.0;
function main() {
	// ...
	// Set the positions of vertices
	var n = initVertexBuffers(gl);
	// ...
	// Set the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// Get the storage location of u_ModelMatrix variable
	var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	// ...
	// Current rotation angle of a triangle
	var currentAngle = 0.0;
	// Matrix4 object for model transformation
	var modelMatrix = new Matrix4();
	// Star to draw a triangle
	var tick = function() {
		currentAngle = animate(currentAngle); // Update the rotation angle
		draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
		requestionAnimationFrame(tick); // Request that the browser calls tick
	};
	tick();
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array ([
		0.0, 0.5, -0.5, -0.5, 0.5, -0.5
	]);
	var n = 3; // The number of vertices
	// ...
	return n;
}
function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
	// Set up rotation matrix
	modelMatrix.setRotate(currentAngle, 0, 0, 1);
	// Pass the rotation matrix to the vertex shader
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	// Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);
	// Draw a triangle
	gl.drawArrays(gl.TRIANGLES, 0, n);
}
// Last time when this function was called
var g_last = Date.now();
function animate(angle) {
	// Calculate the elapsed time
	var now = Date.now();
	var elapsed = now - g_last; // milliseconds
	g_last = now;
	// Update the current rotation angle (adjusted by the elapsed time)
	var newAngle = angle + (ANGLE_STEP + elapsed) / 1000.0;
	return newAngle %= 360;
}


// MultiAttributeSize.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'attribute float a_PointSize;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position;\n' +
	'	gl_PointSize = a_PointSize;\n' +
	'}\n';
// ...
function main() {
	// ...
	// Set the vertex information
	var n = initVertexBuffers(gl);
	// ...
	// Draw three points
	gl.drawArrays(gl.POINTS, 0, n);
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array([
		0.0, 0.5, -0.5, -0.5, 0.5, -0.5
	]);
	var n = 3;
	var sizes = new Float32Array([
	10.0, 20.0, 30.0 // Point sizes
	]);
	// Create a buffer object
	var vertexBuffer = gl.createBuffer();
	var sizeBuffer = gl.createBuffer();
	// ...
	// Write vertex coordinates to the buffer object and enable it
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// ...
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_Position);
	// Write point sizes to the buffer object and enable it
	gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	// ...
	gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_PointSize);
	// ...
	return n;
}


// MultiAttributeSize_Interleaved.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'attribute float a_PointSize;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position;\n' +
	'	gl_PointSize = a_PointSize;\n' +
	'}\n';
// ...
function main() {
	// ...
	// Set the vertex information
	var n = initVertexBuffers(gl);
	// ...
	// Draw three points
	gl.drawArrays(gl.POINTS, 0, n);
}
function initVertexBuffers(gl) {
	var verticesSizes = new Float32Array([
		// Vertex coordinates and size of a point
		 0.0,  0.5, 10.0, // The 1st vertex
		-0.5, -0.5, 20.0, // The 2nd vertex
		 0.5, -0.5, 30.0, // The 3rd vertex
	]);
	var n = 3;
	var sizes = new Float32Array([
	10.0, 20.0, 30.0 // Point sizes
	]);
	// Create a buffer object
	var vertexBuffer = gl.createBuffer();
	var sizeBuffer = gl.createBuffer();
	// ...
	// Write vertex coordinates to the buffer object and enable it
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	var FSIZE = verticesSize.BYTES_PER_ELEMENT;
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// ...
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);
	gl.enableVertexAttribArray(a_Position);
	// Write point sizes to the buffer object and enable it
	gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	// ...
	gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
	gl.enableVertexAttribArray(a_PointSize);
	// ...
	return n;
}


// MultiAttributeColor.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Color;\n' +
	'varying vec4 v_Color;\n' + // varying variable
	'void main() {\n' +
	'	gl_Position = a_Position;\n' +
	'	gl_PointSize = a_PointSize;\n' +
	'	v_Color = a_Color;\n' + // Pass the data to the fragment shader
	'}\n';
// Fragment shader program
var FSHADER_SOURCE =
	// ...
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	'	gl_FragColor = v_Color;\n' + // Receive the data from the vertex shader
	'}\n';
function main() {
	// ...
	// Set the vertex information
	var n = initVertexBuffers(gl);
	// ...
	// Draw three points
	gl.drawArrays(gl.POINTS, 0, n);
}
function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([
		// Vertex coordinates and color
		 0.0,  0.5, 1.0, 0.0, 0.0, // The 1st vertex
		-0.5, -0.5, 0.0, 1.0, 0.0, // The 2nd vertex
		 0.5, -0.5, 0.0, 0.0, 1.0, // The 3rd vertex
	]);
	var n = 3; // The number of vertices
	// Create a buffer object
	var vertexColorBuffer = gl.createBuffer();
	// ...
	// Write vertex coordinates and colors to the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	// ...
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
	gl.enableVertexAttribArray(a_Position); // Enable buffer assignment
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	// ...
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
	gl.enableVertexAttribArray(a_Color); // Enable buffer allocation
	// ...
	return n;
}


Color Triangle (ColoredTriangle.js)
// HelloTriangle.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'	gl_Position = a_Position;\n' +
	'}\n';
// Fragment shader program
var FSHADER_SOURCE =
	'void main() {\n' +
	'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	'}\n';
function main() {
	// ...
	// Set vertex coordinates
	var n = initVertexBuffers(gl));
	// ...
	// Draw a triangle
	gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array([
		0.0, 0.5, -0.5, -0.5, 0.5, -0.5
	]);
	var n = 3; // The number of vertices
	// ...
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	// ...
	return n;
}
*/