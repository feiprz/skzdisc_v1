import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
 
const ScrollToTop = () => {
  const [ visible, setVisible ] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500) {
      setVisible(true);
    } else if (scrolled <= 500) {
      setVisible(false); 
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', toggleVisible);

  return (
    <button id="scroll-up" className={ visible ? "" : "hide" }>
        <FaArrowCircleUp onClick={scrollToTop} />
    </button>
  )
}

export default ScrollToTop