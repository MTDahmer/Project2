
function buildLineGraph(chosenCandidate) {
var url = `/data/${chosenCandidate}`;
d3.json(url, function(data){
    console.log(data);
    likeDic = {};
    retweetDic = {};
    likeData = [];
    retweetData = [];
    data.result.forEach((tweet)=> {
      var date1 = Date.parse(tweet['created_at']);
      console.log(date1);
      likeDic = {
        x : date1,
        y : tweet['favourite_count']
      };
      retweetDic = {
        x : date1,
        y : tweet['retweet_count']
      };
      likeData.push(likeDic);
      retweetData.push(retweetDic);
    });
    console.log(likeData);
    console.log(retweetData);
       
    var finalData = [
      {
        key : "Likes" ,
        values : likeData,
        color : "1f77b4"

      },
      {
        key : "Retweets" ,
        values : retweetData,
        color : "d62728"
      }
    ];



nv.addGraph(function() {
    var chart = nv.models.lineChart()
    .useInteractiveGuideline(true);       

    chart.xAxis
      .axisLabel('Date')
      ;
  
    chart.yAxis
      .axisLabel('# of likes/retweets')
      ;
  
    d3.select('#chart_two svg')
      .datum(finalData)
      .transition().duration(500)
      .call(chart)
      ;
  
    nv.utils.windowResize(chart.update);
  
    return chart;
  });
});
};