/* By Jeffrey, Felipe, Katherine
*  Software Development pd3
*  Array that stores the values of the squares, if it doesnt have a value, it's null and draw at gray square for that
*/

//The following code sets up the screen with all the tiles to start the game
var svg = document.getElementById('2048');
var squares = new Array(4);
var texts = new Array(4);
var width = svg.width.animVal.value;
var height = svg.height.animVal.value;
//ctx.fillStyle = '#776E65';

COLOR = ['bbada0', 'eee4da', 'ede0c8', 'f2b179', 'f59563', 'f67c5f',
         'f65e3b', 'edcf72', 'edcc61', 'edc850', 'edc53f', 'edc22e', '000000', '000000' ];

var makeText = function(i, j) {
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    c.setAttribute('id', 'txt'+ (4*i+j).toString());
    c.setAttribute('x', 120*j + 35);
    c.setAttribute('y', 120*i + 87);
    c.setAttribute('fill', '#ffffff');
    c.setAttribute('font-size', '40');
    c.textContent = '';
    svg.appendChild(c);
    return c;
};

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
    c.setAttribute('rx', 2);
    c.setAttribute('ry', 2);
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
    for (var i=0; i<texts.length; i++) {
	texts[i] = new Array(4);
	for (var j=0; j<texts[i].length; j++) {
	    texts[i][j] = makeText(i, j);
	}
    }
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

    for (var i=0; i<squares.length; i++) {
	for (var j=0; j<squares[i].length; j++) {
	    var sq = squares[i][j];
	    if (sq.getAttribute('value') != 1) {
		texts[i][j].textContent = sq.getAttribute('value');
		if (sq.getAttribute('value') <= 4) {
		    texts[i][j].setAttribute('fill', '#000000');
		} else {
		    texts[i][j].setAttribute('fill', '#ffffff');
		}
	    } else {
		texts[i][j].textContent = '';
	    }
	}
    }
};

var moveUp = function() {
    console.log("UP");
    var moved = false;
    for (var i=0; i<squares.length; i++) {
	for (var j=0; j<squares[i].length; j++) {
	    if (squares[i][j].getAttribute('value') != 1) {
		var stop = 20;
		var collapse = false;
		var square = squares[i][j];
		// duplicate and reset squares
		
		var d = dupSquare(squares[i][j].getAttribute('value'),
	  			  squares[i][j].getAttribute('x'),
				  squares[i][j].getAttribute('y'));
		squares[i][j].setAttribute('value','1');

		squares[i][j].
		    setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[i][j].
							 getAttribute('value')))/
				       Math.log(2)]);

		// check rows next
		if (i > 0) {
		    k = i - 1;
		    cont = true;
		    while (cont) {
			if (k < 0) {
			    stop = 20;
			    break;
			}
			var next = squares[k][j];
			if (next.getAttribute('value') != 1) {
			    cont = false;
			    if (next.getAttribute('value') == d.getAttribute('value')) {
				collapse = true;
				stop = parseInt(next.getAttribute('y'));
			    } else {
				stop = parseInt(next.getAttribute('y')) + 120;
			    }
			} else {
			    k--;
			    moved = true;
			}
		    }   
		}

		// move duplicates
		while (d.getAttribute('y') > stop) {
		    d.setAttribute('y', d.getAttribute('y')-2);
		}

		// tried making it slide but didn't work ;-;

		/*function slide(){
		    d.setAttribute('y', d.getAttribute('y')-0.1);
		    if (d.getAttribute('y') > stop) {
			setTimeout(slide, 500);
		    }
		}*/

		// set the new values
		if (collapse) {
		    squares[(stop-20)/120][j].setAttribute('value', parseInt(d.getAttribute('value'))*2);
		    squares[(stop-20)/120][j].setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[(stop-20)/120][j].
							 getAttribute('value')))/
				       Math.log(2)]);
		} else {
		    squares[(stop-20)/120][j].setAttribute('value', d.getAttribute('value'));
		    squares[(stop-20)/120][j].setAttribute('style', d.getAttribute('style'));
		}
		
		// delete duplicates
		d.parentNode.removeChild(d);
	    }
	}
    }
    return moved;
};

var moveDown = function() {
    console.log("DOWN");
    var moved = false;
    for (var i=squares.length-1; i>=0; i--) {
	for (var j=0; j<squares[i].length; j++) {
	    if (squares[i][j].getAttribute('value') != 1) {
		var stop = 380;
		var collapse = false;
		var square = squares[i][j];

		// duplicate and reset squares
		var d = dupSquare(squares[i][j].getAttribute('value'),
	  			  squares[i][j].getAttribute('x'),
				  squares[i][j].getAttribute('y'));
		squares[i][j].setAttribute('value','1');
		squares[i][j].
		    setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[i][j].
							 getAttribute('value')))/
				       Math.log(2)]);

		// check rows next
		if (i < squares.length-1) {
		    k = i + 1;
		    cont = true;
		    while (cont) {
			if (k > squares.length-1) {
			    stop = 380;
			    break;
			}
			var next = squares[k][j];
			if (next.getAttribute('value') != '1') {
			    cont = false;
			    if (next.getAttribute('value') == d.getAttribute('value')) {
				collapse = true;
				stop = parseInt(next.getAttribute('y'));
			    } else {
				stop = parseInt(next.getAttribute('y')) - 120;
			    }
			} else {
			    k++;
			    moved = true;
			}
		    }   
		}

		// move duplicates
		while (d.getAttribute('y') < stop) {
		    d.setAttribute('y', d.getAttribute('y')+2);
		}

		// set the new values
		if (collapse) {
		    squares[(stop-20)/120][j].setAttribute('value', parseInt(d.getAttribute('value'))*2);
		    squares[(stop-20)/120][j].setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[(stop-20)/120][j].
							 getAttribute('value')))/
				       Math.log(2)]);
		} else {
		    squares[(stop-20)/120][j].setAttribute('value', d.getAttribute('value'));
		    squares[(stop-20)/120][j].setAttribute('style', d.getAttribute('style'));
		}
		
		// delete duplicates
		d.parentNode.removeChild(d);
	    }
	}
    }
    return moved;
};

var moveRight = function() {
    console.log("RIGHT");
    var moved = false;
    for (var i=squares.length-1; i>=0; i--) {
	for (var j=0; j<squares[i].length; j++) {
	    if (squares[j][i].getAttribute('value') != '1') {
		var stop = 380;
		var collapse = false;
		var square = squares[j][i];
		// duplicate and reset squares
		
		var d = dupSquare(squares[j][i].getAttribute('value'),
	  			  squares[j][i].getAttribute('x'),
				  squares[j][i].getAttribute('y'));
		squares[j][i].setAttribute('value','1');

		squares[j][i].
		    setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[j][i].
							 getAttribute('value')))/
				       Math.log(2)]);

		// check rows next
		if (i < squares.length-1) {
		    k = i + 1;
		    cont = true;
		    while (cont) {
			if (k > squares.length-1) {
			    stop = 380;
			    break;
			}
			var next = squares[j][k];
			if (next.getAttribute('value') != '1') {
			    cont = false;
			    if (next.getAttribute('value') == d.getAttribute('value')) {
				collapse = true;
				stop = parseInt(next.getAttribute('x'));
			    } else {
				stop = parseInt(next.getAttribute('x')) - 120;
			    }
			} else {
			    k++;
			    moved = true;
			}
		    }   
		}

		// move duplicates
		while (d.getAttribute('x') < stop) {
		    d.setAttribute('x', d.getAttribute('x')+2);
		}
		// set the new values
		if (collapse) {
		    squares[j][(stop-20)/120].setAttribute('value', parseInt(d.getAttribute('value'))*2);
		    squares[j][(stop-20)/120].setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[(stop-20)/120][j].
							 getAttribute('value')))/
				       Math.log(2)]);
		} else {
		    squares[j][(stop-20)/120].setAttribute('value', d.getAttribute('value'));
		    squares[j][(stop-20)/120].setAttribute('style', d.getAttribute('style'));
		}
		
		// delete duplicates
		d.parentNode.removeChild(d);
	    }
	}
    }
    return moved;
};

var moveLeft = function() {
    console.log("LEFT");
    var moved = false;
    for (var i=0; i<squares.length; i++) {
	for (var j=0; j<squares[i].length; j++) {
	    if (squares[j][i].getAttribute('value') != '1') {
		var stop = 20;
		var collapse = false;
		var square = squares[j][i];
		// duplicate and reset squares
		
		var d = dupSquare(squares[j][i].getAttribute('value'),
	  			  squares[j][i].getAttribute('x'),
				  squares[j][i].getAttribute('y'));
		squares[j][i].setAttribute('value','1');

		squares[j][i].
		    setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[j][i].
							 getAttribute('value')))/
				       Math.log(2)]);

		// check rows next
		if (i > 0) {
		    k = i - 1;
		    cont = true;
		    while (cont) {
			if (k < 0) {
			    stop = 20;
			    break;
			}
			var next = squares[j][k];
			if (next.getAttribute('value') != '1') {
			    cont = false;
			    if (next.getAttribute('value') == d.getAttribute('value')) {
				collapse = true;
				stop = parseInt(next.getAttribute('x'));
			    } else {
				stop = parseInt(next.getAttribute('x')) + 120;
			    }
			} else {
			    k--;
			    moved = true;
			}
		    }   
		}

		// move duplicates
		while (d.getAttribute('x') > stop) {
		    d.setAttribute('x', d.getAttribute('x')-2);
		}
		// set the new values
		if (collapse) {
		    squares[j][(stop-20)/120].setAttribute('value', parseInt(d.getAttribute('value'))*2);
		    squares[j][(stop-20)/120].setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[(stop-20)/120][j].
							 getAttribute('value')))/
				       Math.log(2)]);
		} else {
		    squares[j][(stop-20)/120].setAttribute('value', d.getAttribute('value'));
		    squares[j][(stop-20)/120].setAttribute('style', d.getAttribute('style'));
		}
		
		// delete duplicates
		d.parentNode.removeChild(d);
	    }
	}
    }
    return moved;
};

var move = function(e) {
    var m;
    if (e.keyCode >= 37 && e.keyCode <= 41) {
	// check which key was pressed and do movement
	if (e.keyCode == 38) { // up
	    e.preventDefault();
	    m=moveUp();
        } else if (e.keyCode == 40) { // down
	    e.preventDefault();
	    m=moveDown();
        } else if (e.keyCode == 37) { // left
	    e.preventDefault();
    	    m=moveLeft();
        } else if (e.keyCode == 39) { // down
	    e.preventDefault();
	    m=moveRight();
        }
	// make sure colors correspond to values
	for (var i=0; i<squares.length; i++) {
	    for (var j=0; j<squares[i].length; j++) {
		squares[i][j].setAttribute('style', 'fill:#'+
				 COLOR[Math.log(parseInt(squares[i][j].
							getAttribute('value')))/
				       Math.log(2)]);
	    }
	}
	// generate a random new tile, only if tiles were actualy moved as a result of key
	if (m) {
	    var r = Math.floor(Math.random()*4);
            var c = Math.floor(Math.random()*4);
    	
	    while (squares[r][c].getAttribute('value') != '1' ) {
	        r = Math.floor(Math.random()*4);
	        c = Math.floor(Math.random()*4);
       	    }
    	    var v1 = Math.random();
    	    if (v1 < 0.5) {
	        squares[r][c].setAttribute('value','2');
	        squares[r][c].setAttribute('style','fill:#eee4da');
            }
	}
	//make sure text corresponds to values
	for (var i=0; i<squares.length; i++) {
	    for (var j=0; j<squares[i].length; j++) {
		var sq = squares[i][j];
		if (sq.getAttribute('value') != 1) {
		    texts[i][j].textContent = sq.getAttribute('value');
		    if (sq.getAttribute('value') <= 4) {
		        texts[i][j].setAttribute('fill', '#000000');
		    } else {
			texts[i][j].setAttribute('fill', '#ffffff');
		    }
		} else {
		    texts[i][j].textContent = '';
		}
	    }
	} 
    }
};

initialize();

window.addEventListener( "keydown", move, false );
