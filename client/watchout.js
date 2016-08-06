// start slingin' some d3 here.
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
d3.select('svg').selectAll('circle').data(array).enter().append('circle')
  .style('r', '15px')
  .style('cy', function(d) { return Math.random() * 750; })
  .style('cx', function(d) { return Math.random() * 1000; });

//Player
var drag = d3.behavior.drag().on('drag', function(d) {
  d3.select(this).style('cx', d3.event.x); 
  d3.select(this).style('cy', d3.event.y);
});

var player = [1];
d3.select('svg').selectAll('.player').data(player).enter().append('circle')
  .style('r', '8px')
  .style('cy', (750 / 2))
  .style('cx', (1000 / 2))
  .style('fill', 'red').call(drag);
  

// d3.select('svg').selectAll('circle').data(array).on('mouseover', function(event) {
//   d3.select(this).style('fill', 'red');
// });

setInterval(function() {
  d3.select('svg').selectAll('circle').data(array).transition().duration(750)
  .style('cy', function(d) { return Math.random() * 750; })
  .style('cx', function(d) { return Math.random() * 1000; });
}, 1000);