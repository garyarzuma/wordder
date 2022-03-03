const Vertex = (key) => {
  let id = key
  let connectedTo = new Map()
  let color = 'white'
  let distance = 0
  let predecessor = null

  const addNeighbor = (nbr, weight = 0) => {
    connectedTo.set(nbr, weight)
  }

  const display = () => {
    for (key in connectedTo) {
      console.log(key, connectedTo[key].getId)
    }
  }

  const getConnections = () => {
    return connectedTo
  }

  const getId = () => {
    return id
  }

  const getWeight = (nbr) => {
    return connectedTo.get(nbr)
  }

  const setColor = (newColor) => {
    color = newColor
  }

  const getColor = () => {
    return color
  }

  const setDistance = (dist) => {
    distance = dist
  }

  const getDistance = () => {
    return distance
  }

  const setPred = (vertex) => {
    predecessor = vertex
  }

  const getPred = () => {
    return predecessor
  }

  return { addNeighbor, display, getConnections, getId, getWeight, setColor, getColor, setDistance, getDistance, setPred, getPred }
}

export default Vertex
