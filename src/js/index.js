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
    var source = [],
      cuts = [],
      test;
    // gather inputs 
    $('div.inputs div').each(function(i,e){
      var sourceWidth = parseFloat($(e).find('.input-width').val());
      var sourceLength = parseFloat($(e).find('.input-length').val());
      source.push({
        "h": _.min([sourceWidth, sourceLength]),
        "w": _.max([sourceWidth, sourceLength]),
      });
    });
    //gather target cuts
    $('div.targets div').each(function (i,e) {
      e = $(e);
      var cutWidth = parseFloat($(e).find('.target-width').val());
      var cutLength = parseFloat($(e).find('.target-length').val());
      cuts.push({
        "long": _.max([cutWidth, cutLength]),
        "short": _.min([cutWidth, cutLength]),
        "label": cutWidth + 'x' + cutLength
      });
    });

    console.log(cuts);
    var packer = new Packer(source[0].w, source[0].h);
    cuts = _.orderBy(cuts, function(o){ return o.long * o.short }, ['desc'])
    _.each(cuts, function (e) {
      e.h = e.long;
      e.w = e.short;
    });
    test = packer.fit(cuts);

    cuts = test    

    console.log(cuts);
    draw(source, cuts);
    
  };

  function draw(source, cuts) {
    //initialize dimensions
    var width = source[0].w,
    height = source[0].h,
    scale = 5,
    margin = 20;

    //clear previous data    
    d3.selectAll('svg')
      .remove();

    d3.select('#output')
      .append('svg')
      .attr('width', (width * scale) + margin)
      .attr('height', (height * scale) + margin);

    var svg = d3.select('svg');

    svg.selectAll('.source')
      .data(source).enter()
      .append('rect')
      .attr('class', 'source')
      .attr('width', function (d) { return d.w * scale })
      .attr('height', function(d){ return d.h * scale})
      .attr('x', margin/2)
      .attr('y', margin/2);

    svg.selectAll('.cut')
      .data(cuts).enter()
      .append('rect')
      .attr('class', 'cut')
      .attr('x', function (d) { if (d.fit) { return margin/2 + (d.fit.x * scale)} })
      .attr('y', function (d) { if (d.fit) {return margin/2 + (d.fit.y * scale)} })
      .attr('width', function (d) { if (d.fit) {return d.w * scale}})
      .attr('height', function (d) { if (d.fit) {return d.h * scale}});
  }
})