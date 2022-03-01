const {breadthFirstSearch} = require('./utils/breadthFirstSearch');
const {buildGraph} = require('./utils/buildGraph')

const traverseGraph = (fromWord,toWord, prevGuesses=[]) => {
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
        breadthFirstSearch(myGraph, fromVertex,prevGuesses)
        return traverseNodes(toVertex)
    }
    else return null
}

module.exports = {traverseGraph}

 