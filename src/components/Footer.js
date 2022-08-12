import './styles/Footer.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return(
    <div className="footer">
      <div className = "footer-container">
        <a className = "footer-element" href="https://github.com/garyarzuma">
            Developed by Gary Arzumanyan
        </a>
        <FontAwesomeIcon className='github-square'icon={faGithubSquare} size="xl" />
      </div>
    </div>
  )
}

export default Footer
//<i style="font-size:40px;color:rgb(36,41,47);" className="fa fa-github-square"></i>