function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function buildGauge(freq) {
    // Figure out where the gauge should point...ugh
    var level = freq;
    if (freq > 60000000){
      level = 180;
    } else {
      if (freq >= 52500000){
        level = 168.75;
      } else {
        if (freq >= 45000000){
          level = 157.5;
        } else {
          if (freq >= 30000000){
            level = 135;
          } else {
            if (freq >= 22500000){
              level = 123.75;
            } else {
              if (freq >= 15000000){
                level = 112.5;
              } else {
                if (freq >= 11250000){
                  level = 106.875;
                } else {
                  if (freq >= 7500000){
                    level = 101.25;
                  } else {
                    if (freq >= 4250000){
                      level = 95.625;
                    } else {
                      if (freq >= 2625000){
                        level = 92.8125;
                      } else {
                        if (freq >= 1000000){
                          level = 90;
                        } else {
                          if (freq >= 475000){
                            level = 67.5;
                          } else {
                            if (freq >= 212550){
                              level = 56.25;
                            } else {
                              if (freq >= 131275){
                                level = 50.625;
                              } else {
                                if (freq >= 90637){
                                  level = 48;
                                } else {
                                  if (freq >= 70000){
                                    level = 46.5;
                                  } else {
                                    if (freq >= 50000){
                                      level = 45;
                                    } else {
                                      if (freq >= 37500) {
                                        level = 33.75;
                                      } else {            
                                        if (freq >= 25000){
                                          level = 22.5;
                                        } else {
                                          if (freq >= 18750){
                                            level = 16.875;
                                          } else {
                                            if (freq >= 12500){
                                              level = 11.25;
                                            } else {
                                              if (freq >= 0){
                                              level = 0;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log("building gauge: " + freq + " level will be " + level);
  
    // Trig to calc meter point
    var degrees = 180 - level,
    radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    console.log("x:"+x);
    console.log("y:"+y);
  
    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
  
    var data = [{ 
      type: 'scatter',
      x:[0], 
      y:[0],
      marker: {size: 20, color:'850000'},
      showlegend: false,
      name: 'speed',
      next: level},
      { values: [50/8, 50/8, 50/8, 50/8, 50/8, 50/8, 50/8, 50/8, 50],
      rotation: 90,
      text: ['45 - 65MM', '30-45MM', '15-30MM', '1-15MM',
                '475K - 1MM', '50K - 475K', '25K - 50K', '0 - 25K'],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:[ 'rgba(255, 0, 0, .9)', 'rgba(255, 0, 0, .8)', 'rgba(255, 0, 0, .7)', 'rgba(255, 0, 0, .6)',
                            'rgba(255, 0, 0, .5)', 'rgba(255, 0, 0, .4)', 'rgba(255, 0, 0, .3)',
                            'rgba(255, 0, 0, .2)', 'rgba(255, 255, 255, 0)']},
      hole: .5,
      type: 'pie',
      showlegend: false
    }];
  
    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: numberWithCommas(freq) + ' followers',
      height: 450,
      width: 450,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };
    
    Plotly.newPlot('gauge-chart', data, layout);
  }

  function buildGaugeChart(chosenCandidate) {

    // d3.selectAll("#gauge-chart > *").remove(); 

    var url = `/data/${chosenCandidate}`;
    d3.json(url, function(data) {

        var followers_count = data.result[0]['followers'];
        buildGauge(followers_count);
  
    });
}