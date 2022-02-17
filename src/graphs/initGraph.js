const {buildGraph} = require('./utils/buildGraph');
const {binaryFirstSearch} = require('./utils/binaryFirstSearch');

(() => {
    let myGraph = buildGraph()

    //need to find the vertex in myGraph for 'fool' and put into startingVertex
    const getStartingVertex = (word, graph) => {
        const verts = graph.getVertList()
        for(let v in verts){
            if(verts[v].getId() === word){
                return verts[v]
            }
        }
    }

    const traverseGraph = (y) => {
        let x = y 
        while (x.getPred() !== null ){
            console.log(x.getId(),x.getDistance())
            x = x.getPred()
        }
        console.log(x.getId(),x.getDistance())
        return y.getDistance()
    }

    const startingVertex = getStartingVertex('lets',myGraph)
    binaryFirstSearch(myGraph, startingVertex) 
    console.log(traverseGraph(myGraph.getVertex('meet')))
})()


 