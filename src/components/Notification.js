import React from 'react'
import './styles/Notification.css';

const Notification = ({ message }) => {
  let myClass = ""
  if (message === null) {
    return null
  }
  if(message.indexOf("Success") !== -1) {
    myClass = "goodMessage"
  }
  else if(message.indexOf("Cold") !== -1){
    myClass = "coldMessage"
  }
  else if(message.indexOf("Hot")!== -1){
    myClass = "hotterMessage"
  }
  else{
    myClass = "error"
  }
  return (
    <div className={myClass}>
      {message}
    </div>
  )
}

export default Notification