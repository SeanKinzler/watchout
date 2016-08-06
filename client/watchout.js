// start slingin' some d3 here.
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
d3.select('svg').selectAll('circle').data(array).enter().append('circle')
  .style('r', 15)
  .style('cy', function(d) { return Math.random() * 750; })
  .style('cx', function(d) { return Math.random() * 1000; });

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
  var circs = d3.select('svg').selectAll('circle').data(array);
  for (var i = 0; i < circs[0].length; i++) {
    var x1 = circs[0][i].getBoundingClientRect()['left'] + //current X position for enemy
      (circs[0][i].getBoundingClientRect()['width']) / 2;

    var y1 = circs[0][i].getBoundingClientRect()['top'] + //current Y position for enemy
      (circs[0][i].getBoundingClientRect()['height']) / 2;  

    var x2 = player[0][0].getBoundingClientRect()['left'] + 
      (circs[0][i].getBoundingClientRect()['width']) / 2;            //current X position for player

    var y2 = player[0][0].getBoundingClientRect()['top'] + 
      (circs[0][i].getBoundingClientRect()['height']) / 2;           //current Y position for player
    //console.log(distFormula(x1, x2, y1, y2));
    if (distFormula(x1, x2, y1, y2) <= 75) {
      console.log('you lose!');
        //reset score
    }

  }
}, 1000);

// d3.select('svg').selectAll('circle').data(array).on('mouseover', function(event) {
//   d3.select(this).style('fill', 'red');
// });
var distFormula = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

};

setInterval(function() {
  d3.select('svg').selectAll('circle').data(array).transition().duration(750)
  .style('cy', function(d) { return Math.random() * 750; })
  .style('cx', function(d) { return Math.random() * 1000; });
}, 5000);