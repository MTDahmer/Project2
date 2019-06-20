function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function buildGaugeChart(chosenCandidate) {

    // d3.selectAll("#gauge-chart > *").remove(); 

    var url = `/data/${chosenCandidate}`;
    d3.json(url, function(data) {

    var scale_type = "(in millions)";
    console.log("WHAT IS THE SCALE TYPE NOW: " + scale_type);
    var followers_count = data.result[0]['followers'];
    if (followers_count <= 100000){
        min_value = 0;
        mean_value = 50000;
        max_value = 100000;
        scale_type = "(in thousands)";
    } else {
        if (followers_count <= 1000000){
            min_value = 100000;
            mean_value = 550000;
            max_value = 1000000;
            scale_type = "(in thousands)";
        } else {
            if (followers_count <= 62000000){
                followers_count = followers_count/1000000;
                min_value = 1;
                mean_value = 30.5;
                max_value = 62;
                scale_type = "(in millions)";
            }
        }
    }
    bulletData = {
        "title": "Followers",		//Label the bullet chart
        "subtitle": scale_type,		        //sub-label for bullet chart
        "ranges": [min_value, mean_value, max_value],
        "measures":[followers_count]		 //Value representing current measurement (the thick blue line in the example)
        // "markers":[followers_count]			 //Place a marker on the chart (the white triangle marker)
    };

    nv.addGraph(function() {  
        var chart = nv.models.bulletChart();
            
        d3.select('#gauge-chart svg')
            .datum(bulletData)
            .transition().duration(1000)
            .call(chart);
            
            return chart;
        });
    
    });
}

