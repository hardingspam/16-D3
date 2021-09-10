// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("../data/data.csv").then(function(data) {

  // Print the tvData
  console.log(data);

  var width = 500;
    var height = 500;

    var margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    };

    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var minX = _(data).orderBy('x').first().poverty;
    var maxX = _(data).orderBy('x').last().poverty;

    x.domain([minX - 500, maxX + 500]);
    y.domain([0, 100]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

    var svg = d3
            .select("#d3")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + 0 + "," + height / 2 + ")")
            .call(xAxis);

    svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width / 2 + "," + 0 + ")")
            .call(yAxis)
            .append("text");


  var gdots =  svg.selectAll("g.dot")
            .data(data)
            .enter().append('g');

            gdots.append("circle")
            .attr("class", "dot")
            .attr("r", function (d) {
                return 10;
            })
            .attr("cx", function (d) {
                return x(d.poverty);
            })
            .attr("cy", function (d) {
                return y(d.smokes);
            })
            .style("fill", function (d) {
                return '#50c2e3';
            });
            gdots.append("text").text(function(d){
            	return d.abbr;
            })
            .attr("x", function (d) {
                return x(d.poverty);
            })
            .attr("y", function (d) {
                return y(d.smokes);
            });
  // @TODO
  // Create code to build the bar chart using the tvData.

});
// @TODO: YOUR CODE HERE!
