// Student: Yara Djaidoen
// Student Number: 11123117

window.onload = function() {

  console.log('Yes, you can!')
};
dimentions = {}
var requests = [d3.json("../data/worlddata.json"),
                d3.json("../data/pretty_json.json"),
                d3.json("../data/centroids.json")];

Promise.all(requests).then(function(response) {
    // console.log(response[0])
    var slider = makeSlider(response[1], response[0])
    var drawWorld = drawWorldMap(response[0], response[1], slider)
    var drawSteam = drawSteamgraph()

})

function makeSlider(olympic, world){
  // Draws the slider on the left side of the page
  var dataTime = d3.range(0, 31).map(function(d) {
    return new Date(2016 - 4*d, 10, 3);
  });

  // Draws and updates the silder
  var sliderTime = d3
    .sliderRight()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365 * 4)
    .height(400)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(2016, 10, 3))
    .on('onchange', val => {
      updateWorldMap(olympic, d3.timeFormat("%Y")(val))
       });

  // Creates a svg in the vertical direction
  var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 100)
    .attr('height', 500)
    .append('g')
    .attr('transform', 'translate(30,30)');

  // Cals the function to create svg and the slider
  gTime.call(sliderTime);

  // Returns the value of the selected year
  return d3.timeFormat("%Y")(sliderTime.value())

}

function drawWorldMap(dataWorld, olympic, year){

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([0, 0])
              .html(function(d) {
                if (typeof olympic[year][d.properties.name]=== 'undefined'){
                  return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span><strong>Total Medals: </strong><span class='details'> No data <br></span>"
                }
                else{
                  return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span><strong>Total Medals: </strong><span class='details'>" + olympic[year][d.properties.name]["Total"] + "<br></span>";
                }

              })
  dimentions.tip = tip

  // Define margins and a canvas
  var margin = {top: 0, right: 0, bottom: 0, left: 0},
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

  // Create list with all values and define and scale colors
  medalMax = olympic[year]["United States"]["Total"]
  c = d3.scaleSequential(d3.interpolateYlGn).domain([medalMax, 0])

  // Create a SVG canvas
  var svg = d3.select("div#slider-time")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append('g')
              .attr('class', 'map');

  var projection = d3.geoMercator()
                     .scale(130)
                    .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath().projection(projection);
  createLegend(c, svg, height, width)

  // Draws the countries with colours according to their amount of medals won
  svg.append("g")
      .selectAll("path")
      .data(dataWorld.features)
      .enter().append("path")
      .attr("class", "countries")
      .attr("d", path)
      .style("fill", function(d, i){
        string = Object.keys(olympic[year])
        for (var i = 0; i < string.length; i++){
          if (d.properties.name == string[i]){
            return c(olympic[year][string[i]]["Total"])

          }
        }
      })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
           tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",0.5);
          })
        .on('mouseout', function(d){
          tip.hide(d);
        //
          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        })
        .on("click", function(d){
          drawSunburst(olympic, d.properties.name, year)
        });

  svg.call(tip)
}

function updateWorldMap(olympic, year){
  // updates the world graph. If a year is selected where there were no olympic
  // games the map turns black.
  d3.selectAll(".countries")
    .transition(100)
    .style("fill", "black")
    .style("fill", function(d){
      if (year == "1916" || year == "1940" || year == "1944"){
        return "black"
      }
      else{
      string = Object.keys(olympic[year])
      for (var j = 0; j < string.length; j++){
        if (d.properties.name == string[j]){
          return c(olympic[year][string[j]]["Total"])
          }
        }
      }
    })

  // Get the tooltip from the function drawWorldMap
  tip = dimentions.tip
  tip.html(function (d) {
    if (typeof olympic[year][d.properties.name]=== 'undefined'){
      return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span><strong>Total Medals: </strong><span class='details'> No data <br></span>"
    }
    else{
      return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span><strong>Total Medals: </strong><span class='details'>" + olympic[year][d.properties.name]["Total"] + "<br></span>";
    }
  })
  }

function createLegend(c, svg, height, width){
  var colorDomain = [0, 50, 100, 150, 200, 250]
  var legendLabels = ["<50", "50+", "100+", "150+", "200+", ">200"]


  var legend = svg.selectAll("g.legend")
                  .data(colorDomain)
                  .enter().append("g")
                  .attr("class", "legend");

  var ls_w = 15, ls_h = 15;

  legend.append("rect")
        // .attr("x", function(d, i){ return width - (i*ls_h) - 2*ls_h);})
        .attr("x", width - 20)
        .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("fill", function(d) { return c(d); })
        .style("opacity", 0.8);

  legend.append("text")
        .attr("x", width - 22)
        .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
        .attr("font-size", "10px")
        .attr("text-anchor", "end")
        .text(function(d, i){ return legendLabels[i]; });
}


function drawSunburst(olympic, country, year){
  // console.log(olympic)
  console.log(olympic[year][country])
  // Define a new variables for the sunburstSVG
  var width = 500;
  var height = 500;
  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal(d3.schemeCategory20b);

  // Set the SVG workspace
  var g = d3.select('div#sunburst')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  // Tool that helps organize data into sunburst (all 360degrees are used)
  var partition = d3.partition()
                    .size([2 * Math.PI, radius]);

  // Find the first node in the data
  var root = d3.hierarchy(olympic[year][country])
               .sum(function (d) {
                 console.log(d["Medal"].length)
                 return d.size});

 // // Size arcs
 //  partition(root);
 //  var arc = d3.arc()
 //      .startAngle(function (d) { return d.x0 })
 //      .endAngle(function (d) { return d.x1 })
 //      .innerRadius(function (d) { return d.y0 })
 //      .outerRadius(function (d) { return d.y1 });
 //
 //  // Put it all together
 //  g.selectAll('path')
 //      .data(root.descendants())
 //      .enter().append('path')
 //      .attr("display", function (d) { return d.depth ? null : "none"; })
 //      .attr("d", arc)
 //      .style('stroke', '#fff')
 //      .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });
}

function drawSteamgraph(){
  var n = 20, // number of layers
      m = 200, // number of samples per layer
      stack = d3.stack()
                .keys(d3.range(n).map(function (d) {
                        return "layer"+d; }))
                .offset(d3.stackOffsetWiggle);

// Create empty data structures
var matrix0 = d3.range(m).map(function (d) { return { x:d }; });
var matrix1 = d3.range(m).map(function (d) { return { x:d }; });

// Fill them with random data
d3.range(n).map(function(d) { bumpLayer(m, matrix0, d); });
d3.range(n).map(function(d) { bumpLayer(m, matrix1, d); });

var layers0 = stack(matrix0),
    layers1 = stack(matrix1);

var width = 500,
    height = 300;

var x = d3.scaleLinear()
    .domain([0, m - 1])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([d3.min(layers0.concat(layers1), function(layer) {
            return d3.min(layer, function(d) { return d[0]; }); }),
            d3.max(layers0.concat(layers1), function(layer) {
            return d3.max(layer, function(d) { return d[1]; }); })])
    .range([height, 0]);

var color = d3.scaleLinear()
    .range(["#aad", "#556"]);

var area = d3.area()
    .x(function(d,i) { return x(d.data.x); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

var svg = d3.select("div#steamgraph").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(layers0)
  .enter().append("path")
    .attr("d", area)
    .style("fill", function() { return color(Math.random()); });

function transition() {
  d3.selectAll("path")
      .data(function() {
        var d = layers1;
        layers1 = layers0;
        return layers0 = d;
      })
    .transition()
      .duration(2500)
      .attr("d", area);
    }
    // Inspired by Lee Byron's test data generator.
    function bumpLayer(n, matrix, layer) {

      function bump(a) {
        var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
        for (var i = 0; i < n; i++) {
          var w = (i / n - y) * z;
          a[i] += x * Math.exp(-w * w);
        }
      }

      var a = [], i;
      var i;
      for (i = 0; i < n; ++i) a[i] = 0;
      for (i = 0; i < 5; ++i) bump(a);
      return a.forEach(function(d, i) { matrix[i]["layer"+layer]=Math.max(0, d)+1; });
    }
}
