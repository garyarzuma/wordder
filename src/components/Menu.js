import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './styles/Menu.css'
import {
  Link,
} from 'react-router-dom'
import defaultPicIcon from '../images/default-profile-pic.PNG'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()

  const toWord = useSelector(state => state.words.toWord)
  const fromWord = useSelector(state => state.words.fromWord)
  const fname = useSelector(state => state.user.fname)
  const picURL = useSelector(state => state.user.picURL)
  const loggedIn = useSelector(state => state.user.email)
  const [ dropDown,setDropDown ] = useState(false)

  const logOut = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null,null,null,null))
    setDropDown(!dropDown)
  }

  return (
    <div className="menu-container">
      <div className="float-left-container">
        <Link className="link" to={`/${fromWord}/${toWord}`}>Home</Link>
        <Link className="link" to='/stats'>Statistics</Link>
      </div>
      <div className="float-right-container">
        {loggedIn &&
          <div className='logged-in-right-container'>
            <div className='name'>Welcome, {fname}</div>
            {picURL &&
            <div>
              <img className='pic' src={picURL} alt="profile-pic" onClick={() => setDropDown(!dropDown)} />
            </div>
            }
            {!picURL &&
            <div>
              <img className='pic' src={defaultPicIcon} alt="profile-pic" onClick={() => setDropDown(!dropDown)}/>
            </div>
            }
            {dropDown &&
              <div className='drop-down-container'>
                <a className='link' onClick={() => logOut()}>Logout</a>
              </div>
            }
          </div>
        }
        {!loggedIn &&
          <div className='not-logged-in-right-container'>
            <Link className="link" to="/login">Login</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Menu