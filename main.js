/* By Jeffrey, Felipe, Katherine
*  Software Development pd3
*  Array that stores the values of the squares, if it doesnt have a value, it's null and draw at gray square for that
*/


//The following code sets up the screen with all the tiles to start the game
var svg = document.getElementById('2048');
var squares = new Array(4);
var width = svg.width.animVal.value;
var height = svg.height.animVal.value;
console.log(width);
//ctx.fillStyle = '#776E65';

COLOR = ['bbada0', 'eee4da', 'ede0c8', 'f2b179', 'f59563', 'f67c5f',
         'f65e3b', 'edcf72', 'edcc61', 'edc850', 'edc53f', 'edc22e' ];

var makeSquare = function(i, j) {
  console.log('SQUARE');
  var c = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  c.setAttribute('id', 'grid'+ (4*i+j).toString());
  c.setAttribute('x', 120*i+20);
  c.setAttribute('y', 120*j + 20);
  c.setAttribute('style', 'fill:#bbada0');
  c.setAttribute('width', '100');
  c.setAttribute('height', '100');
  c.setAttribute('value', 0);
  svg.appendChild(c);
  return c;
};

var dupSquare = function(value,x,y) {
  var c = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  c.setAttribute('id', 'temp'));
  c.setAttribute('x', x);
  c.setAttribute('y', y);
  c.setAttribute('style', 'fill:#'+COLOR[parseInt(Math.log2(value)]));
  c.setAttribute('width', '100');
  c.setAttribute('height', '100');
  c.setAttribute('value', 1);
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
  var x = 0;
  while (x < 2) {
    var r = Math.floor(Math.random()*(3-0)+0);
    var c = Math.floor(Math.random()*(3-0)+0);
    var v = Math.random();
    if (v < 0.5) {
      squares[r][c].setAttribute('value','2');
      squares[r][c].setAttribute('style','fill:#eee4da');
    } else {
      squares[r][c].setAttribute('value','4');
      squares[r][c].setAttribute('style','fill:#ede0c8');
    }
    x++;
  }
};

var move = function(e) {
  if (e.keyCode == 38) { // up
    console.log("up");
    for (var i=0; i<squares.length; i++) {
      for (var j=0; j<squares[i].length; j++) {
        // duplicate and reset squares
	var d = dupSquare(squares[i][j].getAttribute('value'),
		  squares[i][j].getAttribute('x'),
		  squares[i][j].getAttribute('y'));
	squares[i][j].setAttribute('value','1'));
	squares[i][j].setAttribute('style', 'fill:#'+COLOR[parseInt(Math.log2(value)]));
        // move duplicates
	if (i > 0) {
	  // check column in the rows above (need to fix)
	  var stop = 'something';
	} else {
	  var stop = 20;
        // delete duplicates and update new postitions
	duplicate.parentNode.removeChild(duplicate);
      }
    }
  } else if (e.keyCode == 40) { // down
    console.log("down");
    for (var i=squares.length-1; i>=0; i--) {
      for (var j=0; j<squares[i].length; j++) {
        // duplicate and reset squares
        // move duplicates
        // delete duplicates and update new postitions
      }
    }
  } else if (e.keyCode == 37) { // left
    console.log("left");
  } else if (e.keyCode == 39) { // down
    console.log("right");
  }
};

initialize();

window.addEventListener( "keydown", move, false )
