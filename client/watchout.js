// start slingin' some d3 here.
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 
  17, 18, 19, 20, 21, 22, 23, 24, 25];
var timeCount = 0;
var highScore = 0;
var collisions = 0;
var collisionsCheck = false;

//Enemy
var enemies = d3.select('svg').selectAll('image').data(array).enter().append('image')
  .attr('xlink:href', 'shuriken.png')
  .attr('x', function(d) { return Math.random() * 1440; }).attr('y', function(d) { return Math.random() * 790; })
  .attr('width', 40).attr('height', 40).attr('id', 'enemy');
  
  

//Player
var drag = d3.behavior.drag().on('drag', function(d) {
  d3.select(this).style('x', d3.event.x); 
  d3.select(this).style('y', d3.event.y); 
});

var playerArr = [26];
var player = d3.select('svg').selectAll('player').data(playerArr).enter().append('image')
  .attr('xlink:href', 'pokeball.png')
  .attr('x', 1440 / 2).attr('y', 790 / 2)
  .attr('width', 70).attr('height', 70).call(drag);



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
    if (distFormula(x1, y1, x2, y2) <= 55) {

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

var distFormula = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

setInterval(function() {
  d3.select('svg').selectAll('image').data(array).transition().duration(750)
  .style('y', function(d) { return Math.random() * 790; })
  .style('x', function(d) { return Math.random() * 1440; });
}, 1000);