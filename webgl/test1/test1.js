var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Color;\n' +
	'uniform mat4 u_ModelMatrix;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	'	gl_Position = u_ModelMatrix * a_Position;\n' +
	'	v_Color = a_Color;\n' +
	'}\n';
// Fragment shader program
var FSHADER_SOURCE =
	'precision mediump float;\n' +
	'uniform float u_Width;\n' +
	'uniform float u_Height;\n' +
	'void main() {\n' +
	'	gl_FragColor = vec4(gl_FragCoord.x/u_Width, 0.0, gl_FragCoord.y/u_Height, 1.0);\n' +
	'}\n';


var TRS = function() {
	this.translation = [0, 0, 0];
	this.rotation = [0, 0, 0];
	this.scale = [1, 1, 1];
};
TRS.prototype.getMatrix = function(dst) {
	dst = dst || new Float32Array(16);
	var t = this.translation;
	var r = this.rotation;
	var s = this.scale;
	makeTranslation(t[0], t[1], t[2], dst);
	matrixMultiply(makeXRotation(r[0]), dst, dst);
	matrixMultiply(makeYRotation(r[1]), dst, dst);
	matrixMultiply(makeZRotation(r[2]), dst, dst);
	matrixMultiply(makeScale(s[0], s[1], s[2]), dst, dst);
	return dst;
};
var Node = function(source) {
	this.children = [];
	this.localMatrix = makeIdentify();
	this.worldMatrix = makeIdentify();
	this.source = source;
};
Node.prototype.setParent = function(parent) {
	// remove us from our parent
	if (this.parent) {
		var ndx = this.parent.children.indexOf(this);
		if (ndx >= 0) {
			this.parent.children.splice(ndx, 1);
		}
	}
	// add us to our new parent
	if (parent) {
		parent.children.push(this);
	}
	this.parent = parent;
};
Node.prototype.updateWorldMatrix = function(matrix) {
	var source = this.source;
	if (source) {
		source.getMatrix(this.localMatrix);
	}
	if (matrix) {
		// a matrix was passed in so do the math
		matrixMultiply(this.localMatrix, matrix, this.worldMatrix);
	} else {
		// no matrix was passed in so just copy
		copyMatrix(this.localMatrix, thisWorldMatrix);
	}
	// now process all the children
	var worldMatrix = this.worldMatrix;
	this.children.forEach(function(child) {
		child.updateWorldMatrix(worldMatrix);
	});
};
function makeNode(nodeDescription) {
    var trs  = new TRS();
    var node = new Node(trs);
    nodeInfosByName[nodeDescription.name] = {
		trs: trs,
		node: node,
    };
    trs.translation = nodeDescription.translation || trs.translation;
    if (nodeDescription.draw !== false) {
		node.drawInfo = {
        	uniforms: {
        		u_colorOffset: [0, 0, 0.6, 0],
        		u_colorMult: [0.4, 0.4, 0.4, 1],
        	},
        	programInfo: programInfo,
        	bufferInfo: cubeBufferInfo,
    	};
    	objectsToDraw.push(node.drawInfo);
    	objects.push(node);
    }
    makeNodes(nodeDescription.children).forEach(function(child) {
    	child.setParent(node);
    });
    return node;
}
function makeNodes(nodeDescriptions) {
	return nodeDescriptions ? nodeDescriptions.map(makeNode) : [];
}


/*
function drawScene() {

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Compute the projection matrix
    var aspect = canvas.clientWidth / canvas.clientHeight;
    var projectionMatrix =
        makePerspective(fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [4, 3.5, 10];
    var target = [0, 3.5, 0];
    var up = [0, 1, 0];
    var cameraMatrix = makeLookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = makeInverse(cameraMatrix);

    var viewProjectionMatrix = matrixMultiply(viewMatrix, projectionMatrix);

    // Draw objects
    clock += 0.01;

    // update the local matrices for each object.
    //nodesByName["left-arm"]

    // Update all world matrices in the scene graph
    scene.updateWorldMatrix();

    var adjust;
    var speed = 4;
    var c = clock * speed;
    adjust = Math.abs(Math.sin(c));
    nodeInfosByName["point between feet"].trs.translation[1] = adjust;
    adjust = Math.sin(c);
    nodeInfosByName["left-leg" ].trs.rotation[0] =  adjust;
    nodeInfosByName["right-leg"].trs.rotation[0] = -adjust;
    adjust = Math.sin(c + 0.1) * 0.4;
    nodeInfosByName["left-calf" ].trs.rotation[0] = -adjust;
    nodeInfosByName["right-calf"].trs.rotation[0] =  adjust;
    adjust = Math.sin(c + 0.1) * 0.4;
    nodeInfosByName["left-foot" ].trs.rotation[0] = -adjust;
    nodeInfosByName["right-foot"].trs.rotation[0] =  adjust;

    adjust = Math.sin(c) * 0.4;
    nodeInfosByName["left-arm" ].trs.rotation[2] =  adjust;
    nodeInfosByName["right-arm"].trs.rotation[2] =  adjust;
    adjust = Math.sin(c + 0.1) * 0.4;
    nodeInfosByName["left-forearm" ].trs.rotation[2] =  adjust;
    nodeInfosByName["right-forearm"].trs.rotation[2] =  adjust;
    adjust = Math.sin(c - 0.1) * 0.4;
    nodeInfosByName["left-hand" ].trs.rotation[2] =  adjust;
    nodeInfosByName["right-hand"].trs.rotation[2] =  adjust;

    adjust = Math.sin(c) * 0.4;
    nodeInfosByName["waist"].trs.rotation[1] =  adjust;
    adjust = Math.sin(c) * 0.4;
    nodeInfosByName["torso"].trs.rotation[1] =  adjust;
    adjust = Math.sin(c + 0.25) * 0.4;
    nodeInfosByName["neck"].trs.rotation[1] =  adjust;
    adjust = Math.sin(c + 0.5) * 0.4;
    nodeInfosByName["head"].trs.rotation[1] =  adjust;
    adjust = Math.cos(c * 2) * 0.4;
    nodeInfosByName["head"].trs.rotation[0] =  adjust;

    // Compute all the matrices for rendering
    objects.forEach(function(object) {
      object.drawInfo.uniforms.u_matrix = matrixMultiply(object.worldMatrix, viewProjectionMatrix);
    });

    // ------ Draw the objects --------

    var lastUsedProgramInfo = null;
    var lastUsedBufferInfo = null;

    objectsToDraw.forEach(function(object) {
      var programInfo = object.programInfo;
      var bufferInfo = object.bufferInfo;
      var bindBuffers = false;

      if (programInfo !== lastUsedProgramInfo) {
        lastUsedProgramInfo = programInfo;
        gl.useProgram(programInfo.program);

        // We have to rebind buffers when changing programs because we
        // only bind buffers the program uses. So if 2 programs use the same
        // bufferInfo but the 1st one uses only positions the when the
        // we switch to the 2nd one some of the attributes will not be on.
        bindBuffers = true;
      }

      // Setup all the needed attributes.
      if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
        lastUsedBufferInfo = bufferInfo;
        setBuffersAndAttributes(gl, programInfo.attribSetters, bufferInfo);
      }

      // Set the uniforms.
      setUniforms(programInfo.uniformSetters, object.uniforms);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, bufferInfo.numElements);
    });
    requestAnimationFrame(drawScene);
  }
  */


// Rotation angle (degrees/second)
var ANGLE_STEP = 90.0;
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

	var clickInfo = [false];
	// Register the event handler
	initEventHandlers(canvas, current, clickInfo);

	// Start to draw a triangle
	var tick = function() {
		animate(current, clickInfo); // Update the rotation angle
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
function initEventHandlers(canvas, current, clickInfo) {
	var dragging = false;         // Dragging or not
	var lastX = -1, lastY = -1;   // Last position of the mouse

	canvas.onmousedown = function(ev) {   // Mouse is pressed
		var x = ev.clientX, y = ev.clientY;
		// Start dragging if a moue is in <canvas>
		var rect = ev.target.getBoundingClientRect();
		if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
			lastX = x; lastY = y;
			dragging = true;
			clickInfo[0] = true;
		}
	};

	canvas.onmouseup = function(ev) { dragging = false; clickInfo[0] = false; }; // Mouse is released

	canvas.onmousemove = function(ev) { // Mouse is moved
		var x = ev.clientX, y = ev.clientY;
		if (dragging) {
			var factor = 100/canvas.height; // The rotation ratio
			var dx = factor * (x - lastX);
			var dy = factor * (y - lastY);
			// Limit x-axis rotation angle to -90 to 90 degrees
			// currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
			var now = Date.now();
			var elapsed = now - g_last; // milliseconds
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
			modelMatrix.setTranslate(0.5 * i + current[1], 0.5 * j + current[2], 0);
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
function animate(current, clickInfo) {
	// Calculate the elapsed time
	var now = Date.now();
	var elapsed = now - g_last; // milliseconds
	g_last = now;
	// Update the current rotation angle (adjusted by the elapsed time)
	if (clickInfo[0] == false)
		current[0] = current[0] + (ANGLE_STEP * elapsed) / 1000.0;
	else
		current[0] = current[0] - (ANGLE_STEP * elapsed) / 1000.0;
	current[0] %= 360;
}
function up() {
  ANGLE_STEP += 30; 
}

function down() {
  ANGLE_STEP -= 30; 
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