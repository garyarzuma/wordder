import React from 'react'
import './styles/Notification.css';

const Notification = ({ message }) => {
  let myClass = ""
  if (message === null) {
    return null
  }
  if(message.indexOf("Good") !== -1 || message.indexOf("Success") !== -1) {
    myClass = "goodMessage"
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