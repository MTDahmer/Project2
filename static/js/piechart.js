a= []

function buildCharts(chosenCandidate) {
  var url = `/data/${chosenCandidate}`;
  d3.json(url,function(data){
    data.result.forEach((tweet)=>{
     a.push(tweet['text']);
    });

   
    topic_x = [];
    var w = ['Healthcare', 'Jobs', 'Immigration','Taxes', 'Gun', 'Income', 'foreign', 'Climate'];
    w.forEach((topic)=>{
      hat = countwords(topic);
      topic_x.push(hat);

      console.log(hat);
    });
    
    console.log(topic_x);
    //  console.log(countwords('health'));

    var var_topics = [
      {key: "Healthcare", y: topic_x[0], color: "#5F5"},
      {key: "Jobs", y: topic_x[1]},
      {key: "Immigration", y: topic_x[2]},
      {key: "Taxes", y: topic_x[3]},
      {key: "Gun", y: topic_x[4]},
      {key: "Income", y: topic_x[5]},
      {key: "Foreign", y: topic_x[6]},
      {key: "Climate", y: topic_x[7]}
    ];

    console.log(var_topics);

    var height = 400;
    var width = 400;

    nv.addGraph(function() {
      var chart = nv.models.pieChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .showLabels(true)
          .width(width)
          .height(height)
          .growOnHover(false)
          .labelType('key')
          .showTooltipPercent(true);

        d3.select("#chart_one svg")
          .datum(var_topics)
          .transition().duration(10)
          .call(chart);

        // // update chart data values randomly
        // setInterval(function() {
        //   var_topics[0].y = Math.floor(Math.random() * 10);
        //   var_topics[1].y = Math.floor(Math.random() * 10);
        //   chart.update();
        // }, 4000);
        return chart;
      });

    });

  }

function countwords(word){
  // var res = a.join().match(/word/g);
  var re = new RegExp(word.toLowerCase(), 'g');
  var res = a.join().match(re);
  console.log(res);
  console.log (res.length)
  return res.length};
  