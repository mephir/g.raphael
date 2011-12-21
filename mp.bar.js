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
    colors = opts.colors || ['0-#eee-#f00', '0-#eee-#0f0', '0-#eee-#00f'];
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
      valueColor = opts.valueColor || '#ffffff',
      valueColorOutside = opts.valueColorOutside || '#444444',
      marginTextTop = opts.marginTextTop || 0,
      chartDirection = opts.chartDirection || 'ltr';

  if (chartDirection == 'rtl')
  {
    var tmp = colors,
    colorsplited;

    colors = [];
    for (var x in tmp)
    {
      colorsplited = tmp[x].split('-');
      if (colorsplited.length == 3)
      {
        colorsplited[0] = '180';
      }
      colors.push(colorsplited.join('-'));
    }
  }

  for (var x in values)
  {
    total += values[x];
  }
  for(var x in values)
  {
    percents.push(Math.round((values[x] / total)*100));
    lengths.push(Math.round((values[x] * barMaxLength) / max));
  }

  var startY = barsMarginTop,
      rectLength,
      textMarginLeft,
      printPath,
      textNode,
      trianglePickY = Math.round(barHeight / 2),
      textMarginTop = Math.round((barHeight - valueSize) / 2) + marginTextTop,
      x1,x2,x3,x4,x5,
      y1,y2,y3,y4,y5,
      textX;

  for(var x in lengths)
  {
    rectLength = lengths[x] - triangleHeight + barsMarginLeft;
    /**
     * (x1,y1)--------------(x2,y2)\
     *                              (x3,y3)
     * (x4,y4)--------------(x5,y5)/
     */
    x1 = barsMarginLeft;
    y1 = startY;
    x2 = rectLength;
    y2 = y1;
    x3 = (triangleHeight + rectLength);
    y3 = (y1 + trianglePickY);
    x4 = rectLength;
    y4 = (y1 + barHeight);
    x5 = barsMarginLeft;
    y5 = (y1 + barHeight);

    if (chartDirection == 'rtl') {
      x1 = width - x1;
      x2 = width - x2;
      x3 = width - x3;
      x4 = width - x4;
      x5 = width - x5;
    }

    printPath = ['M',x1,y1,
      'L',x2,y2,
      'L',x3,y3,
      'L',x4,y4,
      'L',x5,y5,'Z'];
    paper.path(printPath).attr('fill', colors[ x % colors.length]).attr('stroke', 'none');
    textNode = paper.text(x2, startY + textMarginTop + y + barsMarginTop, percents[x] + '%').attr({'font-size' : valueSize, 'fill' : valueColor});
    if(textNode.getBBox().width < rectLength)
    {
      textNode.attr('text-anchor', (chartDirection == 'rtl'?'start':'end'));
    }
    else
    {
      textX = x2 + triangleHeight;
      if (chartDirection == 'rtl')
      {
        textX = x2 - triangleHeight;
      }
      textNode.attr({
        'x' : textX,
        'fill' : valueColorOutside,
        'text-anchor' : (chartDirection == 'rtl'?'end':'start')
      });
    }
    startY = startY + barHeight + barMargin;
  }
};
