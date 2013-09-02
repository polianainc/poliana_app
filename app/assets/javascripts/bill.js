var barGraphHeight = 300,
    barGraphWidth = 380,
    summaryHeight = 80,
    summaryWidth = 960,
    legendY = barGraphHeight + summaryHeight + 50,
    legendHeight = 160,
    legendWidth = summaryWidth;

var $graph = $("#billIndustry");

var colors = d3.scale.ordinal()
        .domain([0,1,2,3,4,5,6,7,8,9])
        .range(["red", "yellow", "blue", "green", "seagreen", "gray", "purple", "black", "brown", "orange"]);

$graph.append('<div class="row"><div class="large-12 columns graph"></div></div>');

$(document).on('click', '.overview', function() {
    var $lastElem = $(".industryBreadcrumbs li:last-child");

    if(!$lastElem.hasClass('overview')) {
        transition(data);
        removeBreadcrumb($lastElem);
    }
});

function removeBreadcrumb($breadcrumb) {
    $breadcrumb.remove();
}
function addBreadcrumb(data) {
    $(".industryBreadcrumbs").append('<li>' + data.name + '</li>');
}

function drawSummaryText(x, y, text, textAnchor,classString, graph) {
    graph.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("class", classString)
        .attr("text-anchor", textAnchor)
        .text(text);
}

function drawSummaryBar(begX, rectHeight, length, graph, color) {
    //create bar
    graph.append("rect")
        .attr("class", color)
        .attr("x", begX)
        .attr("width", length)
        .attr("height", rectHeight);
}

function drawCheckMark(x, y, graph) {
    graph.append("line")
        .attr("x1", x - 15)
        .attr("y1", y - 10)
        .attr("x2", x - 5)
        .attr("y2", y + 0)
        .attr("stroke-width", 7)
        .attr('class', 'check-mark')

    graph.append("line")
        .attr("x1", x - 10)
        .attr("y1", y + 0)
        .attr("x2", x + 7)
        .attr("y2", y - 15)
        .attr("stroke-width", 7)
        .attr('class', 'check-mark')
}

function genWinLength(width, loseAmount, winAmount){
    var winLength =  loseAmount > winAmount ? (width/2)*(winAmount/loseAmount) : (width/2);
    return winLength;
}

function genLoseLength(width, loseAmount, winAmount){
    var loseLength =  loseAmount < winAmount ? (width/2)*(loseAmount/winAmount) : (width/2);
    return loseLength;
}

function genWinX(width, winLength) {
    return width/2 - winLength;
}

function genLoseX(width) {
    return width/2;
}

function mostLeastSort(a,b) {
        var keyA = a.mainTotal,
            keyB = b.mainTotal;

        if(keyA > keyB) return -1;
        if(keyB > keyA) return 1;
        return 0;
}

function leastMostSort(a,b) {
        var keyA = a.mainTotal,
            keyB = b.mainTotal;

        if(keyA < keyB) return -1;
        if(keyB < keyA) return 1;
        return 0;
}

function genXaxis(scale) {
    return d3.svg.axis()
            .scale(scale)
            .orient("bottom")
            .tickPadding(10);
}

function genYaxis(scale, yAxisLoc) {
    return d3.svg.axis()
            .scale(scale)
            .orient(yAxisLoc)
            .tickFormat( function(d) { 
                var f = d3.format('.2s');
                return '$' + f(d);
            });
}

function genX(width) {
    return d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
}

function genY(height) {
    return d3.scale.linear()
        .range([height, 0]);
}

function genGridLines(scale, width, margin) {
    var yGrid = d3.svg.axis()
        .scale(scale)
        .orient("left")
        .tickSize((-width-margin), 0, 0)
        .tickFormat("");

    return yGrid;
}

function genLegend(lData, rData, width, height, y) {

    var wrapper = d3.select('svg');

    var legend = wrapper.append("g")
        .attr("class", "legend")
        .attr("x", 0)
        .attr("y", y)
        .attr("height", height)
        .attr("width", width);

    var legendData = lData.concat(rData)
    legendData.forEach(function(d, i) {
        // console.log(d.name + " " + i);

        var ly = Math.floor(i%5)*(height/5) + y,
            x = Math.floor(i/5)*(width/2) + 30;
        var wrap = legend.append('g')
            .attr('class', 'key');
            
        wrap.append('rect')
            .attr('y', ly)
            .attr('x', x)
            .attr('width', 20)
            .attr('height', 20)
            .attr('class', colors(i));

        wrap.append('text')
            .text(d.name)
            .attr('y', ly + 18)
            .attr('x', x + 30);
    });
}
//Adds a clear clickable rectangle for bars which are too small to easily click
// addClearRect(bars, y(d.mainTotal), x.rangeBand(), rh+30);
function addClearRect(bars, y, width, height, data) {
    bars.append("rect")
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("class", 'transparent hiddenRect')
        .on("click", function(d) {
            barClick(data);
        });
}

function barClick(data) {
    
    if(data.mainChildren) {
        addBreadcrumb(data)
        transition(data);
    }
}

function transitionLegendText(lData, rData) {
    d3.select(".legend")
        .remove();
    genLegend(lData, rData, legendWidth, legendHeight, legendY);
}

//Transition to the next layer down (Industries -> Organizations -> Politicians)
function transition(data) {

    d3.selectAll(".hiddenRect").remove();

    if(data.winner == true) {
        var lData = data.mainChildren.sort(mostLeastSort),
            rData = data.offChildren.sort(leastMostSort),
            lAmount = data.mainTotal;
            rAmount = data.offTotal;
    } else {
        var lData = data.offChildren.sort(mostLeastSort),
            rData = data.mainChildren.sort(leastMostSort),
            lAmount = data.offTotal,
            rAmount = data.mainTotal;
    }

    var leftSummaryGraph = d3.select(".winSummary"),
        rightSummaryGraph = d3.select(".loseSummary");

    var lSumLength = genWinLength(summaryWidth, rAmount, lAmount),
        rSumLength = genLoseLength(summaryWidth, rAmount, lAmount);

    var lSumX = genWinX(width, lSumLength),
        rSumX = genLoseX(width);

    var amountFormat = d3.format(",");

    var winText = "$" + amountFormat(lAmount),
        loseText = "$" + amountFormat(rAmount);

    leftSummaryGraph
        .transition()
        .duration(500)
        .attr("width", lSumLength)
        .attr("x", lSumX);

    rightSummaryGraph
        .transition()
        .duration(500)
        .attr("width", rSumLength)
        .attr("x", rSumX);

    d3.select(".winAmount")
        .transition()
        .duration(500)
        .text(winText);

    d3.select(".loseAmount")
        .transition()
        .duration(500)
        .text(loseText);

    var leftGraph = d3.select(".winGraph").select("g"),
        rightGraph = d3.select(".loseGraph").select("g");

    var lx = genX(barGraphWidth),
        rx = genX(barGraphWidth);
    var y = genY(barGraphHeight);

    var max = d3.max(lData.concat(rData), function(d) { return d.mainTotal + d.mainTotal/10; });

    lx.domain(lData.map(function(d) { return d.name; }));
    rx.domain(rData.map(function(d) { return d.name; }));
    y.domain([0, max]);

    var yAxis = genYaxis(y, "left");
    var lxAxis = genXaxis(lx),
        rxAxis = genXaxis(rx);

    var lyAxis = leftGraph.select(".y-axis")
        .transition()
        .attr('opacity', 0)
        .duration(250);

    lyAxis.transition()
        .duration(0)
        .call(yAxis);

    lyAxis.transition()
        .attr('opacity', 1)
        .duration(250);

    leftGraph.select(".x-axis")
        .transition()
        .duration(500)
        .call(lxAxis);

    var ryAxis = rightGraph.select(".y-axis")
        .transition()
        .attr('opacity', 0)
        .duration(250);

    ryAxis.transition()
        .duration(0)
        .call(yAxis);

    ryAxis.transition()
        .attr("transform", "translate(" + 430 + ",0)")
        .attr('opacity', 1)
        .duration(250);

    rightGraph.select(".x-axis")
        .transition()
        .duration(500)
        .call(rxAxis);


    //Transition leftGraph data
    var lRects = leftGraph.selectAll(".mainBar")
        .data(lData)
        .transition()
        .duration(500)
        .attr("y", function(d) {
            return y(d.mainTotal);
        })
        .attr("height", function(d) {
            return barGraphHeight - y(d.mainTotal);    
        })
        .each("end", function(d){
            var rect = d3.select(this);

            if(parseFloat(rect.attr('height')) < 30) {
                addClearRect(d3.select(this.parentNode), y(d.mainTotal)-30, 67, barGraphHeight - y(d.mainTotal)+30, d);
            }
        });

    //transition rightGraph data
    var rRects = rightGraph.selectAll(".mainBar")
        .data(rData)
        .transition()
        .duration(500)
        .attr("y", function(d) {
            return y(d.mainTotal);
        })
        .attr("height", function(d) {
            return barGraphHeight - y(d.mainTotal);    
        })
        .each("end", function(d){
            var rect = d3.select(this);

            if(parseFloat(rect.attr('height')) < 30) {
                addClearRect(d3.select(this.parentNode), y(d.mainTotal)-30, 67, barGraphHeight - y(d.mainTotal)+30, d);
            }
        });

    //Grid lines
    var yGrid = genGridLines(y, barGraphWidth, 0);
    var grid = d3.selectAll(".grid")
        .call(yGrid);

    transitionLegendText(lData, rData);
}

function influenceSummary(data, winner) {
    var width = 960,
        height = 80;

    var container = d3.select('svg');

    var winData,
        loseData,
        winTitle,
        loseTitle;

        winData = data.mainChildren;
        loseData = data.offChildren;

    if(winner == "yea") {
        winTitle = "Yeas";
        loseTitle = "Nays";
    } else if (winner == "nay") {
        winTitle = "Nays";
        loseTitle = "Yeas";
    } else {
        var error = "Graph can't be displayed at this time.";
    }

    //wrapper
    var graph = container.append("g")
        .attr("class", "summary")
        .attr("width", width)
        .attr("height", height);

    //Format for the dollar amount
    var amountFormat = d3.format(",");

    var textMargin = 20;
    var rectHeight = height/1.2;

    var winLength =  genWinLength(width, data.offTotal, data.mainTotal),
        loseLength =  genLoseLength(width, data.offTotal, data.mainTotal),
        winX = genWinX(width, winLength),
        loseX = genLoseX(width);

    drawSummaryBar(winX, rectHeight, winLength, graph, "green winSummary");
    drawSummaryBar(loseX, rectHeight, loseLength, graph, "gray loseSummary");

    //winAmnt
    drawSummaryText(20, height/2, "$" + amountFormat(data.mainTotal), "begin", "summaryText black winAmount", graph);
    //winTitle
    drawSummaryText(width/2 - textMargin, height/2, winTitle, "end", "summaryText summaryTitle black", graph);

    drawCheckMark((width/2 - width/10), height/2, graph);

    //loseAmnt
    drawSummaryText(width - textMargin, height/2, "$" + amountFormat(data.offTotal), "end", "summaryText black loseAmount", graph);
    //loseTitle
    drawSummaryText(width/2 + textMargin, height/2, loseTitle, "begin", "summaryText summaryTitle black", graph);

    //draw the middle line
    graph.append("line")
        .attr("class", "midLine")
        .attr("x1", width/2)
        .attr("x2", width/2)
        .attr("y1", 0)
        .attr("y2", 400);
}

function influenceBar(sort, data, yAxisLoc, max, xOffset, yOffset, startIndex) {

    //Layout information

    var container = d3.select('svg');

    var width = barGraphWidth,
        height = barGraphHeight;

    if(yAxisLoc == "left") {
        var leftMargin = 60;
        var rightMargin = 0;
    } else if(yAxisLoc == "right") {
        var leftMargin = 0;
        var rightMargin = 40;
    }

    var margin = {
        top: 0,
        right: rightMargin,
        bottom: 100,
        left: leftMargin
    };

    //Scales and axes

    var x = genX(width);
    var y = genY(height);

    var xAxis = genXaxis(x);

    var yAxis = genYaxis(y, yAxisLoc);

    if(yAxisLoc == "left") {
        var yAxisTranslation = 0;
    } else if(yAxisLoc == "right") {
        var yAxisTranslation = width;
    }

    var totalWidth = width + margin.left + margin.right,
        totalHeight = height + margin.top + margin.bottom;

    //create the graph

    var className = (data[0].winner ? "winGraph" : "loseGraph");

    var graph = container.append("g")
        .attr("class", className)
        .attr("width", totalWidth)
        .attr("height", totalHeight)
        .append("g")
        .attr("transform", "translate("+ (xOffset + margin.left) + "," + (yOffset + margin.top) +")");

    data = data.sort(sort);

    x.domain(data.map(function(d) { return d.name; }))
    y.domain([0, max]);

    graph.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(90) translate(80, 0)");

    graph.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + yAxisTranslation + ", 0)")
        .attr('opacity', 1)
        .call(yAxis);

    //Grid lines
    var yGrid = genGridLines(y, width, 0);

    graph.append("g")
        .attr("class", "grid")
        .attr("transform","translate(0,1)")
        .call(yGrid);

    var bars = graph.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", function(d,i){ return "bar" })
        .attr("transform", function(d, i) {
            return "translate(" + x(i) + ",0)";
        })
        .attr("height", function(d) {
            return height - y(d.mainTotal);
        });

    bars.append("rect")
        .attr("y", function(d) {
            return y(d.mainTotal);
        })
        .attr("width", x.rangeBand())
        .attr("height", function(d) {
            var rh = height - y(d.mainTotal);
            if(rh < 20) {
                addClearRect(bars, y(d.mainTotal)-30, x.rangeBand(), rh+30, d);
            }
            return rh;
        })
        .attr("class", function(d,i) {
            return "mainBar " + colors(i + startIndex);
        })
        .on("click", function(d) {
            barClick(d);
        });
}

var width = 960,
    height = 600;

var data;

// grabBill(1);

function grabBill(id) {
    $.getJSON(
        "/bills/"+ id + ".json",
        function(billMetadata) {
            $.getJSON(
                "/bills/cache/"+ billMetadata.data_id + ".json",
                function(bill) {
					$('.mainInfo').remove();
					
					var initialHTML = '<div class="row mainInfo">';

					initialHTML += '<div class="large-12 columns"><h2 class="aligncenter">' + billMetadata.title + '</h2>';
					initialHTML += '<p><b>Sponsored by:</b> <i>' + billMetadata.sponsor_name + '</i><br><b>Result:</b> <i>' + billMetadata.result + '</i><br>' + billMetadata.summary + '</p></div>';
					initialHTML += '<div class="large-12 columns"><h3 class="alignleft">Industry Influence</h3>';
					initialHTML += '<ul class="industryBreadcrumbs">';
					initialHTML += '<li class="overview">Overview</li>';
					initialHTML += '</ul>';
					initialHTML += '</div>';

					initialHTML += '</div>';

					$graph.prepend(initialHTML);
					
                    d3.select("svg").remove();
                    d3.select(".graph").append("svg")
                        .attr("width", width)
                        .attr("height", height)
						.attr("viewBox", "0 0 " + width + " " + height)
						.attr("preserveAspectRatio", "xMidYMid");
						
					$graph.hide();

                    data = bill.data;
                    var winIndustries = bill.data.mainChildren;
                    var loseIndustries = bill.data.offChildren;

                    var max = d3.max(winIndustries.concat(loseIndustries), function(d) { return d.mainTotal + d.mainTotal/10; });

                    influenceBar(mostLeastSort, winIndustries, "left", max, 0, 80, 0);
                    influenceBar(leastMostSort, loseIndustries, "right", max, 520, 80, 5);
                    influenceSummary(bill.data, bill.winner);

                    var legend = genLegend(data.mainChildren, data.offChildren, legendWidth, legendHeight, legendY);

					$graph.fadeIn(250);
        });
    });
}

$('#billSelector').on('change', function() {
	$graph.fadeOut(250);
	
	grabBill($(this).val());
});

$(window).on("resize", function() {
    var targetWidth = $('.graph').width();
	var aspect = targetWidth / $('.graph').height();
	
    $('.graph').attr("width", targetWidth);
    $('.graph').attr("height", targetWidth / aspect);
});