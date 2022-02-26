export const handleHotOrCold = (prevHotOrColdSteps, newHotOrColdSteps) => {
    if(prevHotOrColdSteps > newHotOrColdSteps){
      return "Hotter!"
    }
    else if(prevHotOrColdSteps <= newHotOrColdSteps){
      return "Colder!"
    }
}