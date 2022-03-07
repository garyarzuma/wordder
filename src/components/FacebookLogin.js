import React from 'react'
import FacebookLogin from 'react-facebook-login'
import './styles/FacebookLogin.css'

function FbLogin() {

  const responseFacebook = (response) => {
    console.log(response)
  }
  return (
    <FacebookLogin className="fb-button"
      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
      autoLoad={false}
      fields="name,email,picture"
      scope="public_profile,user_friends,email"
      callback={responseFacebook}
      icon="fa-facebook" />
  )
}

export default FbLogin