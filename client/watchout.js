// start slingin' some d3 here.
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var timeCount = 0;
var highScore = 0;
var collisions = 0;
var collisionsCheck = false;

//Enemy
var enemies = d3.select('svg').selectAll('image').data(array).enter().append('image')
  .attr('xlink:href', 'shuriken.png')
  .attr('x', function(d) { return Math.random() * 1000; }).attr('y', function(d) { return Math.random() * 750; })
  .attr('width', 30).attr('height', 30);
  
  

//Player
var drag = d3.behavior.drag().on('drag', function(d) {
  d3.select(this).style('cx', d3.event.x); 
  d3.select(this).style('cy', d3.event.y);
});

var playerArr = [1];
var player = d3.select('svg').selectAll('.player').data(playerArr).enter().append('circle')
  .style('r', 8)
  .style('cy', (750 / 2))
  .style('cx', (1000 / 2))
  .style('fill', 'red').call(drag);


setInterval(function() {
  var circs = d3.select('svg').selectAll('image').data(array);
  for (var i = 0; i < circs[0].length; i++) {
    var x1 = circs[0][i].getBoundingClientRect()['left'] + //current X position for enemy
      (circs[0][i].getBoundingClientRect()['width']) / 2;

    var y1 = circs[0][i].getBoundingClientRect()['top'] + //current Y position for enemy
      (circs[0][i].getBoundingClientRect()['height']) / 2;  

    var x2 = player[0][0].getBoundingClientRect()['left'] + 
       player[0][0].getBoundingClientRect()['width'] / 2;            //current X position for player

    var y2 = player[0][0].getBoundingClientRect()['top'] + 
      player[0][0].getBoundingClientRect()['height'] / 2;           //current Y position for player
    if (distFormula(x1, y1, x2, y2) <= 30) {

      console.log('you lose!');
      timeCount = 0;
      d3.select('.current').text(function() {
        return 'Current score: ' + timeCount; 
      });
      collisionsCheck = true;
    }

  }

}, 10);
setInterval(function() {
  timeCount++;
  if (timeCount > highScore) {
    highScore = timeCount;
    d3.select('.highscore').text(function() {
      return 'High score: ' + highScore;
    });
  }
  d3.select('.current').text(function() {
    return 'Current score: ' + timeCount; 
  });

  if (collisionsCheck === true) {
    collisions++;
    d3.select('.collisions').text(function() {
      return 'Collision: ' + collisions;
    });
    collisionsCheck = false;
  }

}, 250);

// d3.select('svg').selectAll('shuriken').data(array).on('mouseover', function(event) {
//   d3.select(this).style('fill', 'red');
// });
var distFormula = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

setInterval(function() {
  d3.select('svg').selectAll('image').data(array).transition().duration(750)
  .style('y', function(d) { return Math.random() * 750; })
  .style('x', function(d) { return Math.random() * 1000; });
}, 1000);