a= []
function buildCharts(chosenCandidate) {
var url = `/data/${chosenCandidate}`;
d3.json(url,function(data){
  
  // text = data.result;
  data.result.forEach((tweet)=>{

    a.push(tweet['text']);
   
  });


  w = ['Healthcare', 'Jobs', 'Immigration','Taxes', 'Gun', 'Income', 'foreign', 'Climate','hat cat' ]
  n =[]
  w.forEach((topic)=>{
    var x = countwords(topic)
      // x.filter(function(n){ return x ==null;})
      console.log(x);
  })

    // if (!x){
    //   x

    // }
         
    // return x})

  // var x = countwords(w);
  
  // console.log(x);
  

//Extremely/Very important
// %
// Healthcare    80
// The economy    78
// Immigration    78
// Way women are treated in U.S. society    74
// Gun policy    72
// Taxes    70
// Foreign affairs    68
// Way income and wealth are distributed in the U.S.    68
// The recent confirmation of Brett Kavanaugh to the Supreme Court    64
// U.S. trade and tariff policies    61
// Climate change
});



}

function countwords(word){

  // var res = a.join().match(/word/g);
  var re = new RegExp(word.toLowerCase(), 'g');
  var res = a.join().match(re);
  console.log(res);
  return res.length
}

