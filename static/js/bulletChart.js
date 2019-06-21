function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function buildGaugeChart(chosenCandidate) {

    // d3.selectAll("#gauge-chart > *").remove(); 
    d3.selectAll(".nv-bulletChart").remove()

    var url = `/data/${chosenCandidate}`;
    d3.json(url, function(data) {

    var bulletData = {};


    var followers_count = data.result[0]['followers'];
    if (followers_count <= 100000){
        // bulletData = {
        //     "title": "Followers",		//Label the bullet chart
        //     "subtitle": "(in thousands)",		        //sub-label for bullet chart
        //     "ranges": [0, 50000, 100000],
        //     "measures":[followers_count]		 //Value representing current measurement (the thick blue line in the example)
        // };
        min_value = 0;
        mean_value = 50000;
        max_value = 100000;
        scale_type = "thousands";
    } else {
        if (followers_count <= 1000000){
            // bulletData = {
            //     "title": "Followers",		//Label the bullet chart
            //     "subtitle": "(in thousands)",		        //sub-label for bullet chart
            //     "ranges": [100000, 550000, 1000000],
            //     "measures":[followers_count]		 //Value representing current measurement (the thick blue line in the example)
            // };
            min_value = 100000;
            mean_value = 550000;
            max_value = 1000000;
            scale_type = "thousands";
        } else {
            if (followers_count <= 62000000){
                followers_count = followers_count/1000000;
                // bulletData = {
                //     "title": "Followers",		//Label the bullet chart
                //     "subtitle": "(in millions)",		        //sub-label for bullet chart
                //     "ranges": [1, 30.5, 62],
                //     "measures":[followers_count]
                // };
                scale_type = "millions";
                min_value = 1;
                mean_value = 30.5;
                max_value = 62;
            }
        }
    }

    bulletData = {
        "title": "Followers",		//Label the bullet chart
        "subtitle": "(in " + scale_type + ")",		        //sub-label for bullet chart
        "ranges": [min_value, mean_value, max_value],
        "measures":[followers_count]		 //Value representing current measurement (the thick blue line in the example)
    };


    nv.addGraph(function() {  
        var chart = nv.models.bulletChart();
            
        d3.select('#gauge-chart svg')
            .datum(bulletData)
            .transition().duration(10)
            .call(chart);
            
            return chart;
        });
    
    });
}

