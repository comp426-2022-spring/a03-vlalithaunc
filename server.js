//express is main dependency
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))

args["port"]


// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

const port = args.port || process.env.PORT || 5000

// const logging = (req, res, next) => {
//     console.log(req.body.number)
//     next()
// }

const server = app.listen(port, () => {
    console.log('App is running on %PORT%'.replace('%PORT%', port))
})

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

function coinFlips(flips) {
    const sides = [];
    for(var i = 0; i < flips; i++){
        sides[i] = coinFlip();
    }
    return sides
}

function countFlips(array) {
    var numHeads = 0;
    var numTails = 0;
    for(var i = 0; i < array.length; i++){
      if(array[i] == "heads"){
          numHeads++;
      }
      else if(array[i] == "tails"){
          numTails++;
      }
    }
    if(numHeads == 0){
        return "{ tails: " + numTails.toString() + " }";
    }
    else if(numTails == 0){
        return "{ heads: " + numHeads.toString() + " }";
    }
    else{
        return "{ tails: " + numTails.toString() + ", heads: " + numHeads.toString() + " }";
    }
}    

function flipACoin(call) {
    var flip = coinFlip();
    const results = ['win', 'lose'];
    var result = "";
    if(flip == call){
      result = results[0];
    }
    else{
      result = results[1];
    }
    return "{ call: " + call + ", flip: " + flip + ", result: " + result + " }";
}

app.get('/app/', (req, res) => {
    const statusCode = 200;
    const statusMessage = 'OK';
    res.status(statusCode).end(statusCode + ' ' + statusMessage);
})

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip();
    res.status(200).json({ "flip" : flip});
})


//app.get('/app/echo/', (req, res) => {
 //   res.status(200).json({'message': req.query.number})
//})


// app.get('/app/echo/', logging,  (req, res) => {
//     res.status(200).json({'message': req.body.number})
// })



app.get('/app/echo/:number', (req, res) =>{
    res.status(200).json({'message': req.params.number })
})

app.use(function(req, res){
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})