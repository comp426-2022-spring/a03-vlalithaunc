//express is main dependency
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))

args["port"]


// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

const port = args.port || process.env.PORT || 5000;

//server starts
const server = app.listen(port, () => {
    console.log('App is running on %PORT%'.replace('%PORT%', port))
})

//functions from coin.mjs
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
    let flip = coinFlip();
    let result;
    if(flip == call){
      result = 'win';
    }
    else{
      result = 'lose';
    }
    let game_summary = {
       call: call,
       flip: flip,
       result: result
    }
    return game_summary;
}

app.get('/app/', (req, res) => {
    const statusCode = 200;
    const statusMessage = 'OK';
    res.status(statusCode).end(statusCode + ' ' + statusMessage);
    res.type("text/plain");
})

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip();
    res.status(200).json({ "flip" : flip});
})

app.get('/app/flips/:number', (req, res) =>{
    const flips_arr = coinFlips(req.params.number);
    const count_flips = countFlips(flips_arr);
    res.status(200).json({"raw": flips_arr, "summary": count_flips});
})

app.get('/app/flip/call/:guess(heads|tails)/', (req, res) =>{
    const game_summary = flipACoin(req.params.guess);
    res.status(200).json(game_summary);
})

app.use(function(req, res){
    const statusCode = 404;
    const statusMessage = "NOT FOUND";
    res.status(statusCode).end(statusCode + ' ' + statusMessage);
    res.type("text/plain");
})