const breadthFirstSearch = (graph, start, prevGuesses = []) => {
  start.setDistance(0)
  start.setPred(null)
  const vertQueue = []
  vertQueue.push(start)
  while (vertQueue.length > 0){
    let currentVert = vertQueue.shift() //pops out first item and returns it
    const currentObj = currentVert.getConnections()
    for (let nbr of currentObj){
      let test = true
      if(prevGuesses.length > 1){
        prevGuesses.forEach( (guess) => {
          if (nbr[0].getId() === guess){
            test = false
            nbr[0].setColor('black')
          }
        })
      }
      if (nbr[0].getColor() === 'white' && test === true){
        nbr[0].setColor('gray')
        nbr[0].setDistance(currentVert.getDistance() + 1)
        nbr[0].setPred(currentVert)
        vertQueue.push(nbr[0])
      }
      currentVert.setColor('black')
    }
  }
}

export default breadthFirstSearch