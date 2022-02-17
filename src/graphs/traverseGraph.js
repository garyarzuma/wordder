
const {binaryFirstSearch} = require('./utils/binaryFirstSearch');
const {buildGraph} = require('./utils/buildGraph')

const traverseGraph = (fromWord,toWord) => {
    const myGraph = buildGraph() 

    const traverseNodes = (y) => {
        let x = y 
        const nodeArray = []
        while (x.getPred() !== null ){
            x = x.getPred()
            nodeArray.push(x.getId())
        }
        return [y.getDistance(), nodeArray]
    }

    binaryFirstSearch(myGraph, myGraph.getVertex(fromWord)) 
    return traverseNodes(myGraph.getVertex(toWord))
}

module.exports = {traverseGraph}

 