$(document).ready(function(){function t(t){var e=$(t.target).prev();e.clone().insertAfter(e)}function e(t){var e,r=[],a=[];$("div.inputs div").each(function(t,e){var n=parseFloat($(e).find(".input-width").val()),a=parseFloat($(e).find(".input-length").val());r.push({h:_.min([n,a]),w:_.max([n,a])})}),$("div.targets div").each(function(t,e){e=$(e);var n=parseFloat($(e).find(".target-width").val()),r=parseFloat($(e).find(".target-length").val());a.push({long:_.max([n,r]),short:_.min([n,r]),label:n+"x"+r})}),console.log(a);var i=new Packer(width,height);a=_.orderBy(a,function(t){return t.long*t.short},["desc"]),_.each(a,function(t){t.h=t.long,t.w=t.short}),e=i.fit(a),a=e,console.log(a),n(r,a)}function n(t,e){var n=t[0].w,r=t[0].h,a=5,i=20;d3.selectAll("svg").remove(),d3.select("#output").append("svg").attr("width",n*a+i).attr("height",r*a+i);var c=d3.select("svg");c.selectAll(".source").data(t).enter().append("rect").attr("class","source").attr("width",function(t){return t.w*a}).attr("height",function(t){return t.h*a}).attr("x",i/2).attr("y",i/2),c.selectAll(".cut").data(e).enter().append("rect").attr("class","cut").attr("x",function(t){if(t.fit)return i/2+t.fit.x*a}).attr("y",function(t){if(t.fit)return i/2+t.fit.y*a}).attr("width",function(t){if(t.fit)return t.w*a}).attr("height",function(t){if(t.fit)return t.h*a})}$("#addTarget").click(t),$("#calculate").click(e)});