const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://forestiouser1:4estIO@ds149221.mlab.com:49221/forestio', {
    useMongoClient: true,
});
mongoose.connection.once('openUri', () => {
    console.log('Connected to MongoDB ForestJS server on mLab');
});


// Schema definition
var branchSchema = new Schema({
    id: Number,
    name: String,
    desc: String,
    tags: Array,
    leaves: Array
})

let branchController = {};

var Branch = mongoose.model('Branch', branchSchema);

branchController.getAllBranches = function (req, res) {
    // treeQuery is input from tree search
    //   let treeQuery = req.body.treeQuery;);
    Branch.find({}, (err, branches) => {
        if (err || !branches) {
            return res.status(500).json("Invalid treeQuery")
        } else {
            console.log('branches -->', branches)
            res.json(branches);
        }
    });
}

branchController.findBranches = function (branchesIdsArray, res) {
    Branch.find({id: {$in: branchesIdsArray}}, (err, branches) => {
        if (err || !branches) {
            return res.status(500).json("Invalid branch query")
        } else {
            console.log('branches -->', branches)
            res.json(branches);
        }
    });
}



module.exports = branchController;