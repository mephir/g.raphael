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
    colors = opts.colors || ['0-#f00-#fff', '0-#0f0-#fff', '0-#00f-#fff'];//this.g.colors,
    len = values.length,
    total = 0,
    percents = [],
    lengths = [],
    paths = [];

    var barMaxLength = opts.barMaxLength || 190,
        barHeight = opts.barHeight || 24,
        barMargin = opts.barMargin || 4,
        barsMarginTop = opts.barsMarginTop || 8,
        barsMarginLeft = opts.barsMarginLeft || 0,
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
      lengths.push(Math.round((values[x] * barMaxLength) / max));
    }
    var startY = barsMarginTop;
    var rectLength,
        trianglePickY = Math.round(barHeight / 2),
        printPath;

    for(var x in lengths)
    {
      rectLength = lengths[x] - triangleHeight;

      printPath = ['M',barsMarginLeft,startY,
        'L',rectLength,startY,
        'L',(triangleHeight + rectLength),(startY + trianglePickY),
        'L',rectLength,(startY + barHeight),
        'L',barsMarginLeft,(startY + barHeight),'Z'];

      paper.path(printPath).attr('fill', '0-#f00-#fff');

      startY = startY + barHeight + barMargin;
    }

    console.log(max, total, percents, lengths);
};
