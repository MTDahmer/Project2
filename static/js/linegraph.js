function grabData() {
d3.json("http://localhost:5000/data/<chosenCandidate>", function(data){
    dates = [];
    followerCount = [];
    for (x in data) {
        dates.push(data.created_at);
        followerCount.push(data.followers);
    }
    console.log(dates);
    console.log(followerCount);

});
};

nv.addGraph(function() {
    var chart = nv.models.lineChart()
      .useInteractiveGuideline(true)
      ;
  
    chart.xAxis
      .axisLabel('Date')
      .tickFormat(d3.format('f'))
      ;
  
    chart.yAxis
      .axisLabel('Follower Count')
      .tickFormat(d3.format('f'))
      ;
  
    d3.select('#chart_two')
      .datum(grabData())
      .transition().duration(500)
      .call(chart)
      ;
  
    nv.utils.windowResize(chart.update);
  
    return chart;
  });