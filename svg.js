var svg = document.getElementById("vimage");
var height = vimage.getAttribute("height");
var width = vimage.getAttribute("width");
var b = document.getElementById("clear");
var move = document.getElementById("move");

var change = function(e) {
	if (this.getAttribute("fill")=="red") {
		svg.appendChild(makeCirc(Math.random()*width, Math.random()*height));
		console.log("Removing!");
		svg.removeChild(this);
		return ;
	}
	console.log("circ");
	this.setAttribute("fill", "red");
	e.stopPropagation();
};

var randCirc = function(e) {
	if (e.target.getAttribute("fill")=="red" && this.tagName=="svg") {
	}
}

var makeCirc = function(x,y) {
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	c.setAttribute("cx", x);
	c.setAttribute("cy", y);
	c.setAttribute("r", Math.random()*50);
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

};

svg.addEventListener('click', addCirc);
b.addEventListener('click', clear);
move.addEventListener('click', anim);