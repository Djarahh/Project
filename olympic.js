// Student: Yara Djaidoen
// Student Number: 11123117

window.onload = function() {

  console.log('Yes, you can!')
};

var requests = [d3.json("../data/worlddata.json"), d3.json("../data/summer.json")];
Promise.all(requests).then(function(response) {
    // console.log(response[1])
    var drawWorld = drawWorldMap(response[0])

})

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
  var svg = d3.select("body")
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
  makeSlider()
}

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
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    });

  var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 100)
    .attr('height', 500)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));
}
