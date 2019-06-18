function buildCharts(chosenCandidate) {
var url = `/data/${chosenCandidate}`;
d3.json(url).then(function(data){
  a =[]
  data.forEach((tweet)=>{
  
  a.push(tweet)
  })
console.log(a);
})

};
  


////-------------------------------------------------------