import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './styles/FacebookLogin.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {  faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FbLogin() {

  library.add(fas, faFacebook)

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
        <div className='facebook-button-container'>
          <FontAwesomeIcon icon="fa-brands fa-facebook" className="facebook-icon" inverse />
          <button className="fb-button" onClick={renderProps.onClick}>Continue with Facebook</button>
        </div>
      )}
    />
  )
}

export default FbLogin