import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import Cursor from "./components/CustomCursor/Cursor";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Logo from "./assets/logo.png";
import "./App.css";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [click, setClick] = useState(false);

  const navbar = () => {
    if (showNavbar) setShowNavbar(false);
    else setShowNavbar(true);
  };

  const handleClick = useMemo(() => setClick(true), [click]);
  const handleNav = useMemo(() => navbar, [showNavbar]);

  useEffect(() => {
    if (click) {
      setTimeout(() => {
        setClick(false);
      }, 500);
    }
  }, [click]);

  return (
    <div
      onMouseDown={handleClick}
      id="app"
      className={showNavbar ? "nav-active app" : "app"}
    >
      <Cursor click={click} />
      <Router>
        <header className="cd-header">
          <div className="header-wrapper">
            <div className="logo-wrap">
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            <div onClick={handleNav} className="nav-but-wrap">
              <div className="menu-icon">
                <span className="menu-icon__line menu-icon__line-left"></span>
                <span className="menu-icon__line"></span>
                <span className="menu-icon__line menu-icon__line-right"></span>
              </div>
            </div>
          </div>
        </header>
        <div className="nav">
          <div className="nav__content">
            <ul className="nav__list">
              <li className="nav__list-item">
                <NavLink onClick={handleNav} to="/" className="hover-target">
                  Home
                </NavLink>
              </li>
              <li className="nav__list-item">
                <NavLink
                  onClick={handleNav}
                  to="/projects"
                  className="hover-target"
                >
                  Projects
                </NavLink>
              </li>
              <li className="nav__list-item">
                <NavLink
                  onClick={handleNav}
                  to="/contact"
                  className="hover-target"
                >
                  Contact Me
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
