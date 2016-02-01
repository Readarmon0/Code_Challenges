var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'uniform mat4 u_ModelMatrix;\n' +
	'void main() {\n' +
	'	gl_Position = u_ModelMatrix * a_Position;\n' +
	'}\n';
// Fragment shader program
var FSHADER_SOURCE =
	'precision mediump float;\n' +
	'uniform float u_Width;\n' +
	'uniform float u_Height;\n' +
	'void main() {\n' +
	'	gl_FragColor = vec4(gl_FragCoord.x/u_Width, 0.0, gl_FragCoord.y/u_Height, 1.0);\n' +
	'}\n';
// Rotation angle (degrees/second)
var ANGLE_STEP = 90.0;
var Tx = 0.5; // Translation distance
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
	// Set the positions of vertices
	var n = initVertexBuffers(gl);
	if (n < 0) {
		console.log('Failed to set the positions of the vertices');
		return;
	}
	// Create a rotation matrix
	var radian = Math.PI * ANGLE_STEP / 180.0; // Convert to radians
	var cosB = Math.cos(radian), sinB = Math.sin(radian);
	// Set the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);
	// Pass the rotation matrix to the vertex shader
	var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	// Current rotation angle of a triangle
	var current = [0.0, 0.0, 0.0];
	// Matrix4 object for model transformation
	var modelMatrix = new Matrix4();

	// Register the event handler
	initEventHandlers(canvas, current);

	// Start to draw a triangle
	var tick = function() {
		animate(current); // Update the rotation angle
		draw(gl, n, current, modelMatrix, u_ModelMatrix);
		requestAnimationFrame(tick); // Request that the browser calls tick
	};
	tick();
}
function initVertexBuffers(gl) {
	var vertices = new Float32Array ([
		0.0, 0.1, -0.1, -0.1, 0.1, -0.1
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
	if (a_Position < 0) {
		console.log('Fail to get the storage location of a_Position');
		return -1;
	}
	// Assign the buffer object to a a_Position variable
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	var u_Width = gl.getUniformLocation(gl.program, 'u_Width');
	if (!u_Width) {
		console.log('Failed to get the storage location of u_Width');
		return;
	}
	var u_Height = gl.getUniformLocation(gl.program, 'u_Height');
	if (!u_Height) {
		console.log('Failed to get the storage location of u_Height');
		return;
	}
	// Pass the width and height of the <canvas>
	gl.uniform1f(u_Width, gl.drawingBufferWidth);
	gl.uniform1f(u_Height, gl.drawingBufferHeight)
	// Enable the generic vertex attrbute array
	gl.enableVertexAttribArray(a_Position);
	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	return n;
}
function initEventHandlers(canvas, current) {
	var dragging = false;         // Dragging or not
	var lastX = -1, lastY = -1;   // Last position of the mouse

	canvas.onmousedown = function(ev) {   // Mouse is pressed
		var x = ev.clientX, y = ev.clientY;
		// Start dragging if a moue is in <canvas>
		var rect = ev.target.getBoundingClientRect();
		if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
			lastX = x; lastY = y;
			dragging = true;
		}
	};

	canvas.onmouseup = function(ev) { dragging = false;  }; // Mouse is released

	canvas.onmousemove = function(ev) { // Mouse is moved
		var x = ev.clientX, y = ev.clientY;
		if (dragging) {
			var factor = 100/canvas.height; // The rotation ratio
			var dx = factor * (x - lastX);
			var dy = factor * (y - lastY);
			// Limit x-axis rotation angle to -90 to 90 degrees
			// currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
			current[0] += 20.0;
			current[1] += dx / 10.0;
			current[2] -= dy / 10.0;
		}
		lastX = x, lastY = y;
	};
}
function draw(gl, n, current, modelMatrix, u_ModelMatrix) {
	// Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);

	for (var i = -1; i < n - 1; i++) {
		for (var j = -1; j < n - 1; j++) {
			// Set up rotation matrix
			modelMatrix.setTranslate(Tx * i + current[1], Tx * j + current[2], 0);
			modelMatrix.rotate(current[0], 0, 0, 1);
			// Pass the rotation matrix to the vertex shader
			gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
			// Draw a triangle
			gl.drawArrays(gl.TRIANGLES, 0, n);
		}
	}
}
// Last time when this function was called
var g_last = Date.now();
function animate(current) {
	// Calculate the elapsed time
	var now = Date.now();
	var elapsed = now - g_last; // milliseconds
	g_last = now;
	// Update the current rotation angle (adjusted by the elapsed time)
	current[0] = current[0] + (ANGLE_STEP * elapsed) / 1000.0;
	current[0] %= 360;
}
function up() {
  ANGLE_STEP += 10; 
}

function down() {
  ANGLE_STEP -= 10; 
}


/*
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
*/