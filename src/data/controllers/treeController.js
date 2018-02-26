const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://forestiouser1:4estIO@ds149221.mlab.com:49221/forestio', {
    useMongoClient: true,
});
mongoose.connection.once('openUri', () => {
    console.log('Connected to MongoDB ForestJS server on mLab');
});

// Schema definition
var treeSchema = new Schema({
    name: String,
    desc: String,
    branches: Array,
    tags: Array,
})

let treeController = {};
var Tree = mongoose.model('Tree', treeSchema);

treeController.getAllTrees = function (req, res) {
    Tree.find({}, (err, trees) => {
        if (err || !trees) {
            return res.status(500).json("Invalid treeQuery")
        } else {
            console.log('trees -->', trees)
            res.json(trees);
        }
    });
}

treeController.addTree = function (req, res) {
    var Tree = mongoose.model('Tree', treeSchema);

}

module.exports = treeController;