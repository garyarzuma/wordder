import wordList from '../wordLists/esl_forum_word_list'
import Graph from '../graphClasses/graph'

const buildGraph = () => {
  const g = Graph()
  const d = {}

  wordList.forEach( word => {
    const len = word.length
    let i = 0
    while( i < len){
      const bucket = word.substring(0,i) + '_' + word.substring(i+1)
      if (bucket in d) {
        d[bucket].push(word)
      }
      else d[bucket] = [word]
      i++
    }
  })

  for (let bucket in d){
    d[bucket].forEach(word1 => {
      d[bucket].forEach( word2 => {
        if (word1 !== word2){
          g.addEdge(word1,word2)
        }
      })
    })
  }

  return g
}

export default buildGraph