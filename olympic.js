// Student: Yara Djaidoen
// Student Number: 11123117

window.onload = function() {

  console.log('Yes, you can!')
};

var requests = [d3.json("../data/worlddata.json"),
                d3.json("../data/summer.json"),
                d3.json("../data/centroids.json")];

Promise.all(requests).then(function(response) {
    console.log(response[0])
    var slider = makeSlider()
    var drawWorld = drawWorldMap(response[0])
    // var drawCentoids = drawCentoids(response[2])
    var drawSteam = drawSteamgraph()

})

function makeSlider(){
  // Time
  var dataTime = d3.range(0, 31).map(function(d) {
    return new Date(2016 - 4*d, 10, 3);
  });


  var sliderTime = d3
    .sliderRight()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365 * 4)
    .height(400)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(2016, 10, 3))
    // .on('onchange', val => {
    //   d3.select('p#value-time')
    //     .text(d3.timeFormat('%Y')(val));
    //    });

  var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 100)
    .attr('height', 500)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  // d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));
}

function drawWorldMap(dataWorld){

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([0, 0])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>";
              })

  // Define margins and a canvas
  var margin = {top: 0, right: 0, bottom: 0, left: 0},
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

  // Create list with all values and define and scale colors
  // obesityValues = d3.set(obesity.map(function(d)
  //                 {return d.Obesity_Among_Adults})).values();
  // c = d3.scaleLinear().domain([Math.min(...obesityValues), Math.max(...obesityValues)]).range([255, 0])


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
  // createLegend(c, svg, height)

  // Draws the countries with colours according to their obesity
  svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(dataWorld.features)
      .enter().append("path")
      .attr("d", path)
      // .style("fill", function(d, i) {
      //     for (var i = 0; i < obesity.length; i++){
      //       if (d.id == obesity[i].Code){
      //         // return "rgb(0, 0, " + c(obesity[i].Obesity_Among_Adults) + ")"
      //         return "rgb(0,0,0)"
      //       }
      //     }
      //     return "rgb(220, 220, 220)"
      // })
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
        // .on("click", function(d){
        //   updateGraph(rawObesity, d.id)
        // });

  svg.call(tip)
}

function drawCentoids(topojson){
  // Define margins and a canvas
  var margin = {top: 0, right: 0, bottom: 0, left: 0},
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

  svg = d3.select("div#slider-time")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append('g')
          .attr('class', 'map');

}

function drawSunburst(){

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
