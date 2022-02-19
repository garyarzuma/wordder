const {binaryFirstSearch} = require('./utils/binaryFirstSearch');
const {buildGraph} = require('./utils/buildGraph')

const traverseGraph = (fromWord,toWord) => {
    const myGraph = buildGraph() 
    const fromVertex = myGraph.getVertex(fromWord)
    const toVertex = myGraph.getVertex(toWord)

    const traverseNodes = (y) => {
        let x = y 
        const nodeArray = []
        while (x.getPred() !== null ){
            x = x.getPred()
            nodeArray.splice(0, 0, x.getId())
        }
        return [y.getDistance(), nodeArray]
    }

    if(fromVertex != null && toVertex != null) {
        binaryFirstSearch(myGraph, fromVertex)
        return traverseNodes(toVertex)
    }
    else return null
}

module.exports = {traverseGraph}

 