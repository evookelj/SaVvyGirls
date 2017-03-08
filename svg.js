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
	window.cancelAnimationFrame( rid );

	var bounce = function() {
		var circs = document.getElementsByTagName("circle")
		for (var i=0; i<circs.length; i++) {
			var curx = circs[i].getAttribute("cx");
			var cury = circs[i].getAttribute("cy");
			var r = circs[i].getAttribute("r");
			if ((curx > width-r) || (curx<0)) { 
				curx--; 
			} else {
				curx++;
			}

			if ((cury > height-r) || (cury < 0)) {
				curx--;
			} else {
				cury++;
			}
			circs[i].setAttribute("cx",curx);
			circs[i].setAttribute("cy",cury);
		}
		rid = window.requestAnimationFrame(bounce);
	}
	bounce();

};

svg.addEventListener('click', addCirc);
b.addEventListener('click', clear);
move.addEventListener('click', anim);