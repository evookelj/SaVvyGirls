var svg = document.getElementById("vimage");
var height = vimage.getAttribute("height");
var width = vimage.getAttribute("width");
var b = document.getElementById("clear");
var move = document.getElementById("move");
var rid;

var change = function(e) {
	if (this.getAttribute("fill")=="red") {
		svg.appendChild(makeCirc(Math.random()*width, Math.random()*height));
		svg.removeChild(this);
		return ;
	}
	this.setAttribute("fill", "red");
	e.stopPropagation();
};

var makeCirc = function(x,y) {
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	c.setAttribute("cx", x);
	c.setAttribute("cy", y);
	c.setAttribute("r", (Math.random()*30)+20);
	c.setAttribute("fill", "aliceblue");
	c.setAttribute("stroke", "black");
	c.addEventListener('click', change);

	return c;
};

var addCirc = function(e) {
	console.log("SVG");
	if (this == e.target) {
		svg.appendChild(makeCirc(e.offsetX, e.offsetY));
	}
};

var clear = function(e) {
	while (svg.hasChildNodes()) {
		svg.removeChild(svg.lastChild);
	}
};

var anim = function(e){
	var oneAnim = function(circ) {
		var xvol = 1;
    	var yvol = 1;
    	window.cancelAnimationFrame( rid );

    	var bounce = function(circ) {
    		console.log("A: ");
    		console.log(circ);
    		console.log(circ.getAttribute("r"));
    		console.log();
    		var curx = parseInt(circ.getAttribute("cx"));
			var cury = parseInt(circ.getAttribute("cy"));
			if ((curx>=width-parseInt(circ.getAttribute("r"))) || (curx==0)) {
	    		xvol *= -1;
			}
			console.log("B: ");
    		console.log(circ);
			if ((cury>=height-parseInt(circ.getAttribute("r"))) || (cury==0)) {
	    		yvol *= -1;
			}
			console.log("C: ");
    		console.log(circ);
			circ.setAttribute("cx", curx+xvol);
			circ.setAttribute("cy", cury+yvol);
			rid = window.requestAnimationFrame( bounce );
			console.log();
    	}
    	bounce(circ);
	}

	var circs = svg.childNodes;
	for (var i=1; i<circs.length; i++) {
		console.log("NEXT");
		oneAnim(circs[i]);
		console.log("\n");
	}
};

svg.addEventListener('click', addCirc);
b.addEventListener('click', clear);
move.addEventListener('click', anim);