import React from 'react'
import './styles/Notification.css'

const Notification = ({ message }) => {
  let myClass = ''
  if (message === null) {
    return null
  }
  if(message.indexOf('Success') !== -1) {
    myClass = 'green'
  }
  else if(message.indexOf('Cold') !== -1){
    myClass = 'rgb(0, 140, 255)'
  }
  else if(message.indexOf('Hot')!== -1){
    myClass = 'rgb(255, 81, 0)'
  }
  else{
    myClass = 'red'
  }
  return (
    <div className='notification' style={{ color:myClass }}>
      {message}
    </div>
  )
}

export default Notification