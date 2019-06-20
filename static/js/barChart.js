function buildBarChart(){
    d3.json("/metadata", function(data){
      
      var retweetList = [];
      var favoriteList = [];
      var retweetDictionary = {};
      var favoritesDictionary = {};

      // building necessary structure for dvd3 graph
      data.forEach((item)=>{
        // not including Trump as his numbers are way off scale with other candidates
        // he will have his own chart; see trumpBarChart.js
        if (item["name"] != "Donald J. Trump"){
          retweetDictionary = 
            {
              label: item["name"],
              value: item["retweets"]
            };
          favoritesDictionary = 
            {
              label: item["name"],
              value: item["favorites"]
            };
          retweetList.push(retweetDictionary);
          favoriteList.push(favoritesDictionary);
        }
      });

      var correctData = [
        {
          key: "Retweets",
          color: "d62728",
          values: retweetList
        },
        {
          key: "Favorites",
          color: "1f77b4",
          values: favoriteList
        }
      ];

      nv.addGraph(function ()
      {
        var chart = nv.models.multiBarChart()
        .x(function (d) {
         return d.label; // Configure x axis to use the "label" within the json.
        })
        .y(function (d) {
          return d.value; // Configure y axis to use the "value" within the json.
        }).margin({top: 30, right: 20, bottom: 100, left: 85}) // Add some CSS Margin to the chart.
        // .forceY(-5000)
        .reduceXTicks(false)
        .showControls(false) // Turn of switchable control
        .stacked(false); // Force stacked mode.

      // chart.xAxis.axisLabel('Candidates'); // add label to the horizontal axis

      chart.yAxis.tickFormat(d3.format('0f')); // Round the yAxis values
 
      chart.rotateLabels(-45);

      d3.select('#chart_three svg') // Select the html element by ID
          .datum(correctData) // Pass in the data
          .transition().duration(500) // Set transition speed
          .call(chart); // Call & Render chart
      
      nv.utils.windowResize(chart.update); // Intitiate listener for window resize so the chart responds and changes width.
      return;
      });
    });
}