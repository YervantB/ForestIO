//initialize
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//controllers
const treeController = require('./../data/controllers/treeController');
const branchController = require('./../data/controllers/branchController');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/trees', (req, res) => {
    treeController.getAllTrees(req, res);
})

app.get('/branches', (req, res) => {
    branchController.getAllBranches(req, res);
})

//send post request as json object with key "ids" and ids as an array (e.g. "ids":[1,3,5] )
//ex: axios.post('localhost:3030/findbranches',{ids:[1,2,3]}) -> Returns JSON with branches 1,2,3
app.post('/findbranches', (req, res) => {
    //receives the array of branch ids
    let branchIds= req.body.ids;
    branchController.findBranches(branchIds, res);
})

//update tree score


app.listen(3030);
