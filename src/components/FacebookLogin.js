import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './styles/FacebookLogin.css'

function FbLogin() {

  const responseFacebook = (response) => {
    console.log(response)
  }
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
      autoLoad={false}
      fields="name,email,picture"
      scope="public_profile,user_friends,email"
      callback={responseFacebook}
      render={renderProps => (
        <button className="fb-button" onClick={renderProps.onClick}>SIGN IN WITH FACEBOOK</button>
      )}
    />
  )
}

export default FbLogin