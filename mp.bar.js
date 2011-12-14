/*!
 * g.Raphael 0.4.1 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Pawel Wilk (pwilkmielno@gmail.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.mpbarchart = function (x, y, width, height, values, opts) {
  opts = opts || {};
  var paper = this,
    max = Math.max.apply(Math, values),
    colors = opts.colors || ['0-#eee-#f00', '0-#eee-#0f0', '0-#eee-#00f'];//this.g.colors,
    total = 0,
    percents = [],
    lengths = [],
    paths = [];

    var barMaxLength = opts.barMaxLength || 190,
        barHeight = opts.barHeight || 26,
        barMargin = opts.barMargin || 8,
        barsMarginTop = opts.barsMarginTop || 8,
        barsMarginLeft = opts.barsMarginLeft || 0,
        triangleHeight = opts.triangleHeight || 12;
        valueSize = opts.valueSize || Math.round(barHeight * 0.9),
        valueColor = opts.valueColor || '#e2ebbe';

    paper.rect(0,0,width,height).attr({fill: "#000"}); //helper in background, to remove

    for(var x in values)
    {
      total += values[x];
    }

    for(var x in values)
    {
      percents.push(Math.round((values[x] / total)*100));
      lengths.push(Math.round((values[x] * barMaxLength) / max));
    }

    var startY = barsMarginTop;
    var rectLength,
        textMarginLeft,
        printPath,
        textNode,
        trianglePickY = Math.round(barHeight / 2),
        textMarginTop = Math.round((barHeight - valueSize) / 2);

    for(var x in lengths)
    {
      rectLength = lengths[x] - triangleHeight + barsMarginLeft;

      printPath = ['M',barsMarginLeft,startY,
        'L',rectLength,startY,
        'L',(triangleHeight + rectLength),(startY + trianglePickY),
        'L',rectLength,(startY + barHeight),
        'L',barsMarginLeft,(startY + barHeight),'Z'];

      paper.path(printPath).attr('fill', colors[ x % colors.length]);
      textNode = paper.text(barsMarginLeft, startY + textMarginTop + y, percents[x] + '%');
      textNode.attr('x', (rectLength - textNode.getBBox().width)).attr({'font-size' : valueSize, 'fill' : valueColor});
      startY = startY + barHeight + barMargin;
    }

    console.log(textMarginTop);
};
