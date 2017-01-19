/*
dependencies to add:
  Bootstrap
  Lodash

*/


$(document).ready(function(){
//  $('#addInput').click(duplicate);
  $('#addTarget').click(duplicate);
  $('#calculate').click(calculate);
  
  function duplicate (evt){
    var lastrow = $(evt.target).prev();
    lastrow.clone().insertAfter(lastrow)
  };
  function calculate (evt){
    //initialize variables
    var inputs = [],
      targets = [],
      width,
      length;
    // gather inputs 
    $('div.inputs div').each(function(i,e){
      width = $(e).find('.input-width').val();
      length = $(e).find('.input-length').val();
      inputs.push({
        "width": _.min([width, length]),
        "length": _.max([width, length]),
        "area": width * length,
        "perimeter": (2*width) + (2*length)
      });
    });
    //gather target cuts
    $('div.targets div').each(function (i,e) {
      e = $(e);
      width = $(e).find('.target-width').val();
      length = $(e).find('.target-length').val();
      targets.push({
        "width": _.min([width, length]),
        "length": _.max([width, length]),
        "area": width * length,
        "perimeter": (2*width) + (2*length)
      });
    });
    
    d3.select('#output')
      .append('svg')
      .attr('width', 1200)
      .attr('height', 1200);

    var svg = d3.select('svg');

    svg.selectAll('.source')
      .data(inputs).enter()
      .append('rect')
      .attr('class', 'source')
      .attr('width', function(d) {return d.length * 8})
      .attr('height', function(d) {return d.width * 8});
  };
})