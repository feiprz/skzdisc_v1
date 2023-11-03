import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

const Nav = () => {
  const [ isClicked, setIsClicked ] = useState(false);

  const { width } = useWindowSize();

  useEffect( () => {
    if (width > 375) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [width])

  const handleOnClick = () => {
    if (isClicked === false) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }

  return (
    <header className="Nav">
      <div className="navi">
        <h1><Link to="/">SKZ DISC</Link></h1>
        <button 
          id="main-menu"
          onClick={handleOnClick} 
        > <GiHamburgerMenu />
        </button>
      </div>
      <nav className={ !isClicked && "hide" }>
        <li><Link to="album">Albums</Link></li>
        <li><Link to="song">Songs</Link></li>
        <li><Link to="credits">Credits</Link></li>
        <li><Link to="credits/search">Search</Link></li>
      </nav>
    </header>
  )
}

export default Nav