$(document).ready(function(){function t(t){var e=$(t.target).prev();e.clone().insertAfter(e)}function e(t){var e,n,a=[],i=[];$("div.inputs div").each(function(t,i){e=$(i).find(".input-width").val(),n=$(i).find(".input-length").val(),a.push({width:_.min([e,n]),length:_.max([e,n]),area:e*n,perimeter:2*e+2*n})}),$("div.targets div").each(function(t,a){a=$(a),e=$(a).find(".target-width").val(),n=$(a).find(".target-length").val(),i.push({width:_.min([e,n]),length:_.max([e,n]),area:e*n,perimeter:2*e+2*n})}),d3.select("#output").append("svg").attr("width",1200).attr("height",1200);var r=d3.select("svg");r.selectAll(".source").data(a).enter().append("rect").attr("class","source").attr("width",function(t){return 8*t.length}).attr("height",function(t){return 8*t.width})}$("#addTarget").click(t),$("#calculate").click(e)});