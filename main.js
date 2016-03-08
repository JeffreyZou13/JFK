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

var makeSquare = function(i, j) {
  console.log('SQUARE');
  var c = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  c.setAttribute('id', 'grid'+ (4*i+j).toString());
  c.setAttribute('x', 120*i+20);
  c.setAttribute('y', 120*j + 20);
  c.setAttribute('style', 'fill:#BBADA0');
  c.setAttribute('width', '100');
  c.setAttribute('height', '100');
  svg.appendChild(c);
}

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
}


var initialize = function() {
  makeBackground();

  for (var i=0;i<squares.length;i++) {
    squares[i] = new Array(4);
    for (var j=0;j<squares[i].length;j++) {
      squares[i][j] = makeSquare(i, j);
    }
  }


}

initialize();
