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
      miss = [],
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
    var packer = new Packer(source[0].w, source[0].h);
    cuts = _.orderBy(cuts, function(o){ return o.long * o.short }, ['desc'])
    _.each(cuts, function (e) {
      e.w = e.long;
      e.h = e.short;
    });
    cuts = packer.fit(cuts);
    _.each(cuts, function(e,i,c) {
      if (!e.fit) {
        miss.push(cuts.splice(i,1)); 
      }
    });
    draw(source, cuts, miss);
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
      .attr('y', function (d) { if (d.fit) {return margin/2 + (d.fit.y  * scale)} })
      .attr('width', function (d) { if (d.fit) {return d.w * scale}})
      .attr('height', function (d) { if (d.fit) {return d.h * scale}});

    svg.selectAll('.label')
      .data(cuts).enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', function (d) { if (d.fit) { return margin/2 + (d.fit.x * scale) + 5} })
      .attr('y', function (d) { if (d.fit) {return margin/2 + (d.fit.y  * scale) + 15} })
      .text(function(d) {return d.label});
  }

  function swap (array, i, j) {
    var result = array.slice();
    result[i] = array[j];
    result[j] = array[i];
    return result;
  }


  function permute(source, array) {
    var input = array.slice();
    var result = [input];
    var length = array.length;
    var c = new Array(length);
    _.fill(c, 0);
    var i = 0;
    while (i < length) {
      if (c[i] < i) {
        if (i % 2) {
          input = swap(input, c[i], i);
        }
        else {
          input = swap(input, 0, i);
        }
        result.push(input);
        draw(source, input);
        c[i] += 1;
        i = 0;
      }
      else {
        c[i] = 0;
        i += 1;        
      }
    }
    return result;
  };
})