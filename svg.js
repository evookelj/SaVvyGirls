var svg = document.getElementById("vimage");
var height = vimage.getAttribute("height");
var width = vimage.getAttribute("width");
var b = document.getElementById("clear");
var move = document.getElementById("move");
var rid;

//change circle color upon click
var change = function(e) {
    if (this.getAttribute("fill")=="red") {
	svg.appendChild(makeCirc(Math.random()*width, Math.random()*height));
	svg.removeChild(this);
	return ;
    }
    this.setAttribute("fill", "red");
    e.stopPropagation();
};

//make circle at x,y
var makeCirc = function(x,y) {
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", (Math.random()*30)+20);
    c.setAttribute("fill", "aliceblue");
    c.setAttribute("stroke", "black");
    c.setAttribute("xvol", 1);
    c.setAttribute("yvol", 1);
    c.addEventListener('click', change);

    return c;
};

//add a circle to svg
var addCirc = function(e) {
    console.log("SVG");
    if (this == e.target) {
	svg.appendChild(makeCirc(e.offsetX, e.offsetY));
    }
};

//clear screen
var clear = function(e) {
    while (svg.hasChildNodes()) {
	svg.removeChild(svg.lastChild);
    }
};

//animate / 'move' button
var anim = function(e){
    window.cancelAnimationFrame( rid );
    
    var bounce = function() {
	var circs = document.getElementsByTagName("circle");
	for (var i=0; i<circs.length; i++) { //for all circles
	    var circ = circs[i];

	    var curx = parseInt(circ.getAttribute("cx"));
	    var cury = parseInt(circ.getAttribute("cy"));
	    var xvol = parseInt(circ.getAttribute("xvol"));
	    var yvol = parseInt(circ.getAttribute("yvol"));
	    var r = parseInt(circ.getAttribute("r"));

	    //adjust x/y accordingly based on boundaries
	    if (curx >= width-r || curx <= r) { 
		circ.setAttribute("xvol",xvol*-1);
		console.log("ID: " + i + " Xcor: " + circ.getAttribute("xvol"));
	    }
	    
	    if (cury >= height-r || cury <= r) {
		circ.setAttribute("yvol", yvol*-1);
	    }

	    //shoutout to klau to help with debugging
	    //console.log(xvol);
	    //console.log(yvol);
	   // console.log(r);
	    //console.log("\n");
	    //console.log("\n");
	    curx += parseInt(circ.getAttribute("xvol"));
	    cury += parseInt(circ.getAttribute("yvol"));
	    //change circle positions
	    circ.setAttribute("cx",curx);
	    circ.setAttribute("cy",cury);
	}
	//animate!
	rid = window.requestAnimationFrame(bounce);
    }
    bounce();

};

svg.addEventListener('click', addCirc);
b.addEventListener('click', clear);
move.addEventListener('click', anim);
