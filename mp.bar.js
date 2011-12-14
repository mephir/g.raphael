/*!
 * g.Raphael 0.4.1 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Pawel Wilk (pwilkmielno@gmail.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.mpbarchart = function (x, y, width, height, values, opts) {
  opts = opts || {};
  var paper = this,
    chart = this.set(),
    max = Math.max.apply(Math, values),
    colors = opts.colors || this.g.colors,
    len = values.length,
    total = 0,
    percents = [];

    var barMaxLength = opts.barMaxLength || 190,
        barHeight = opts.barHeight || 24,
        barMargin = opts.barMargin || 4,
        barTopMargin = opts.barTopMargin || 3,
        triangleHeight = opts.triangleHeight || 12;

    paper.rect(0,0,width,height).attr({fill: "#000"}); //helper in background, to remove

    //calculations
    for(var x in values)
    {
      total += values[x];
    }

    for(var x in values)
    {
      percents.push(Math.round((values[x] / total)*100)/100);
    }

    paper.path(['M',10,10,'L',100,10,'L',120,20,'L',100,30,'L',10,30,'Z']).attr('fill', '0-#f00-#fff \');


    console.log(max, total, percents);
};
