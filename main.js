/* By Jeffrey, Felipe, Katherine
*  Software Development pd3
*  Array that stores the values of the squares, if it doesnt have a value, it's null and draw at gray square for that
*/

//The following code sets up the screen with all the tiles to start the game
var svg = document.getElementById('2048');
var squares = new Array(4);
var width = svg.width.animVal.value;
var height = svg.height.animVal.value;
//ctx.fillStyle = '#776E65';

COLOR = ['bbada0', 'eee4da', 'ede0c8', 'f2b179', 'f59563', 'f67c5f',
         'f65e3b', 'edcf72', 'edcc61', 'edc850', 'edc53f', 'edc22e' ];

var makeSquare = function(i, j) {
    console.log('SQUARE');
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    c.setAttribute('id', 'grid'+ (4*i+j).toString());
    c.setAttribute('x', 120*j + 20);
    c.setAttribute('y', 120*i + 20);
    c.setAttribute('style', 'fill:#bbada0');
    c.setAttribute('width', '100');
    c.setAttribute('height', '100');
    c.setAttribute('value', 1);
    svg.appendChild(c);
    return c;
};

var dupSquare = function(value,x,y) {
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    c.setAttribute('id', 'temp');
    c.setAttribute('x', x);
    c.setAttribute('y', y);
    //console.log(Math.log2(1));
    c.setAttribute('style', 'fill:#'+COLOR[Math.log(value)/Math.log(2)]);
    c.setAttribute('width', '100');
    c.setAttribute('height', '100');
    c.setAttribute('value', value);
    svg.appendChild(c);
    return c;
};

var makeBackground = function() {
    console.log('BACKGROUND');
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    c.setAttribute('id', 'bigOne');
    c.setAttribute('style', 'fill:#776E65');
    c.setAttribute('x', 0);
    c.setAttribute('y', 0);
    //Round corners
    c.setAttribute('rx', 5);
    c.setAttribute('ry', 5);
    c.setAttribute('width', width.toString());
    c.setAttribute('height', height.toString());
    svg.appendChild(c);
};

var initialize = function() {
    makeBackground();
    for (var i=0; i<squares.length; i++) {
	squares[i] = new Array(4);
	for (var j=0; j<squares[i].length; j++) {
	    squares[i][j] = makeSquare(i, j);
	}
    }
    //console.log(squares);
    //The two tiles must be distinct
    var r1 = Math.floor(Math.random()*4);
    var c1 = Math.floor(Math.random()*4);
    
    var r2 = Math.floor(Math.random()*4);
    var c2 = Math.floor(Math.random()*4);
    
    if (r1 === r2 && c1 === c2) {
	r2 = Math.floor(Math.random()*4);
	c2 = Math.floor(Math.random()*4);
    }
    var v1 = Math.random();
    if (v1 < 0.5) {
	squares[r1][c1].setAttribute('value','2');
	squares[r1][c1].setAttribute('style','fill:#eee4da');
    } else {
	squares[r1][c1].setAttribute('value','4');
	squares[r1][c1].setAttribute('style','fill:#ede0c8');
    }
    
    var v2 = Math.random();
    if (v2 < 0.5) {
	squares[r2][c2].setAttribute('value','2');
	squares[r2][c2].setAttribute('style','fill:#eee4da');
    } else {
	squares[r2][c2].setAttribute('value','4');
	squares[r2][c2].setAttribute('style','fill:#ede0c8');
    }
};

var moveUp = function() {
    console.log("UP");
    for (var i=0; i<squares.length; i++) {
	//console.log(squares[i]);
	for (var j=0; j<squares[i].length; j++) {
	    //console.log(squares[i][j]);
	    if (squares[i][j].getAttribute('value') != 1) {
		console.log(squares[i][j]);
		var stop = 20;
		var collapse = false;
		var square = squares[i][j];
		// duplicate and reset squares
		
		var d = dupSquare(squares[i][j].getAttribute('value'),
	  			  squares[i][j].getAttribute('x'),
				  squares[i][j].getAttribute('y'));
		squares[i][j].setAttribute('value','1');
		//console.log(squares[i][j].getAttribute('value'));
		//console.log(Math.log(squares[i][j].getAttribute('value'))/Math.log(squares[i][j].getAttribute('value')));
		squares[i][j].
		    setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[i][j].
							 getAttribute('value')))/
				       Math.log(2)]);
		//console.log(parseInt(Math.log2(squares[i][j].getAttribute('value'))));
		console.log("i"+i+" j"+j);
		// check rows above
		if (i > 0) {
		    console.log("stopp");
		    k = i - 1;
		    cont = true;
		    while (cont) {
                        console.log("cont "+stop);
			if (k < 0) {
			    stop = 20;
			    break;
			}
			var above = squares[k][j];
			if (above.getAttribute('value') != 1) {
			    cont = false;
			    if (above.getAttribute('value') == d.getAttribute('value')) {
				collapse = true;
				stop = parseInt(above.getAttribute('y'));
			    } else {
				stop = parseInt(above.getAttribute('y')) + 120;
			    }
			} else {
			    k--;
			}
		    }   
		    console.log(stop);
		}
		console.log(stop);
		// move duplicates
		while (d.getAttribute('y') > stop) {
		    d.setAttribute('y', d.getAttribute('y')-2);
		}
		console.log(stop);
		console.log(collapse);
		// set the new values
		if (collapse) {
		    
		} 
		    console.log(d);
		    console.log(stop);
		    console.log((stop-20)/120);
		    
		    squares[(stop-20)/120][j].setAttribute('value', d.getAttribute('value'));
		    squares[(stop-20)/120][j].setAttribute('style', d.getAttribute('style'));
		
		
		// delete duplicates
		d.parentNode.removeChild(d);
	    }
	}
    }
};

var moveDown = function() {
    console.log("down");
    for (var i=squares.length-1; i>=0; i--) {
	for (var j=0; j<squares[i].length; j++) {
	    // duplicate and reset squares
	    // move duplicates
	    // delete duplicates and update new postitions
	}
    }
};

var moveLeft = function() {
    console.log("left");
};

var moveRight = function() {
    console.log("right");
};

var move = function(e) {
    if (e.keyCode == 38) { // up
	e.preventDefault();
	moveUp();
    } else if (e.keyCode == 40) { // down
	e.preventDefault();
	moveDown();
    } else if (e.keyCode == 37) { // left
	e.preventDefault();
	moveLeft();
    } else if (e.keyCode == 39) { // down
	e.preventDefault();
	moveRight();
    }
};

initialize();

window.addEventListener( "keydown", move, false );
