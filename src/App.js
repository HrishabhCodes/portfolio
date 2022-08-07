import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import { useState } from "react";
import Logo from "./assets/logo.png";
import "./App.css";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [active, setActive] = useState("home");

  const toggleNav = (page) => {
    if (page === "home-logo") {
      setActive(page.substring(0, 4));
      return;
    }
    setActive(page);
    setShowNavbar(!showNavbar);
  };

  return (
    <div id="app" className={showNavbar ? "nav-active app" : "app"}>
      <Router>
        <header className="cd-header">
          <div className="header-wrapper">
            <div className="logo-wrap">
              <Link onClick={() => toggleNav("home-logo")} to="/">
                <img src={Logo} alt="" />
              </Link>
            </div>
            <div onClick={() => toggleNav(active)} className="nav-but-wrap">
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
              <li
                className={
                  active === "home"
                    ? "nav__list-item active-nav"
                    : "nav__list-item"
                }
              >
                <NavLink
                  onClick={() => toggleNav("home")}
                  to="/"
                  className="hover-target"
                >
                  Home
                </NavLink>
              </li>
              <li
                className={
                  active === "projects"
                    ? "nav__list-item active-nav"
                    : "nav__list-item"
                }
              >
                <NavLink
                  onClick={() => toggleNav("projects")}
                  to="/projects"
                  className="hover-target"
                >
                  Projects
                </NavLink>
              </li>
              <li
                className={
                  active === "contact"
                    ? "nav__list-item active-nav"
                    : "nav__list-item"
                }
              >
                <NavLink
                  onClick={() => toggleNav("contact")}
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
