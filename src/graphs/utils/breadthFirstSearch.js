const breadthFirstSearch = (graph, start) => {
    start.setDistance(0)
    start.setPred(null)
    const vertQueue = []
    vertQueue.push(start)
    while (vertQueue.length > 0){
        let currentVert = vertQueue.shift() //pops out first item and returns it
        const currentObj = currentVert.getConnections()
        for (let nbr of currentObj){
             if(nbr[0].getColor() === 'white'){
                nbr[0].setColor('gray')
                nbr[0].setDistance(currentVert.getDistance() + 1)
                nbr[0].setPred(currentVert)
                vertQueue.push(nbr[0]) 
            } 
        currentVert.setColor('black')     
        } 
    }
}

module.exports = {breadthFirstSearch}