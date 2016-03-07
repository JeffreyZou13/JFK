/* By Jeffrey, Felipe, Katherine
*  This works on canvas stuff
*  Software Development pd3
*
*
*  Array that stores the values of the squares, if it doesnt have a value, it's null and draw at gray square for that
*

*/

var squares = new Array(4);

for (var i=0;i<squares.length;i++) {
  squares[i] = new Array(4);
  for (var j=0;j<squares[i].length;j++) {
    squares[i][j] = makeSquare(i, j);
  }
}

var svg = document.getElementById('2048');
var width = svg.width;
var height = svg.height;
//ctx.fillStyle = '#776E65';

var makeSquare = function(i, j) {
  var c = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  c.setAttribute('id', 'grid'+ toString(4*i+j));
  c.setAttribute('x', );
  c.setAttribute('y', j + 20);
}
