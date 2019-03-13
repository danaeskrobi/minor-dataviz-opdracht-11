var margin = {top: 20, right: 100, bottom: 20, left: 50}
  , width = window.innerWidth - margin.left - margin.right // Use the window's width 
  , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

// set the ranges
var x = d3.scaleLinear().range([0, width * 0.6]);
var y = d3.scaleLinear().range([height * 0.5 , 0]);
var r = d3.scaleLinear().range([0, 10]);

  //opnieuw
var valueline = d3.line()
    .x(function(d){
        return x(d.budget);
    })
    .y(function(d){
        return y(d.rating);
    })

var svg = d3
    .select("#svgContainer")
    .attr("height", "auto")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
    .attr('preserveAspectRatio','xMinYMin')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //get data
    d3.csv("/d3/data.csv").then(function(data) {
        console.log(data);

        // format the data
        data.forEach(function(d) {
           d.budget = +d.budget;
           d.rating = +d.rating;
           d.profitability = d.profitability;
           d.movie = d.movie;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.budget; }));
        y.domain([0, d3.max(data, function(d) { return d.rating; })]);
        r.domain([0, d3.max(data, function(d) { return d.profitability})]);

        var tooltip = d3.select("#svgContainer").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);
        
         var tipMouseover = function(d) {
         var html  = d.movie + "<br/>" + d.profitability ;
            
         tooltip.html(html)
                      .style("left", (d3.event.pageX + 15) + "px")
                      .style("top", (d3.event.pageY - 28) + "px")
                    .transition()
                      .duration(200) // ms
                      .style("opacity", 1)
      
      };

         var tipMouseout = function(d){
            tooltip.transition()
               .duration(100)
               .style("opacity", 0);
         }



        // Add the valueline path.
        svg.append("path")
           .data([data])
           .attr("class", "line")
           .attr("d", valueline);
         
        // Add ellipses
        svg.selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("r", function(d) {return r(d.profitability)})
            .attr("cx", function(d) { return x(d.budget); })
            .attr("cy", function(d) { return y(d.rating); })
            .on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);

        // Add the X Axis
        svg.append("g")
           .attr("transform", "translate(0," + height * 0.5 + ")")
           .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
           .call(d3.axisLeft(y));
           
     });