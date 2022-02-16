const {Vertex} = require("./vertex.js")

const Graph = () => {
    let vertList = {}
    let numVertices = 0

    const addVertex = (key) => {
        numVertices = numVertices + 1
        const newVertex = Vertex(key)
        vertList[key] = newVertex
        return newVertex
    }

    const getVertex = (n) => {
        if (n in vertList) {
            return vertList[n]
        }
        else return null
    }

    const addEdge = ( f ,t,weight=0) => {
        if (!(f in vertList)) {
            const nv = addVertex(f)
        }
        if(!(t in vertList)) {
            const nnv = addVertex(t)
        }
        vertList[f].addNeighbor(vertList[t], weight)
    }

    const getVertices = () => {
        return Object.keys(vertList)
    }

    const getVertList = () => {
        return vertList
    }

    return {addVertex,getVertex, addEdge, getVertices, getVertList}
}

module.exports = {Graph}

