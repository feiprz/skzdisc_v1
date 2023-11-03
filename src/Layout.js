import Nav from './components/Nav';
import ScrollToTop from './components/ScrollToTop';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="App">
        <Nav />
        <Outlet />
        <ScrollToTop />
    </div>
  )
}

export default Layout