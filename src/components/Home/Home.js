import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "./Home.css";

const skills = [
  {
    name: "ReactJs",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
  },
  {
    name: "Javascript",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  },
  {
    name: "Java",
    url: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
  },
  {
    name: "Firebase",
    url: "https://firebase.google.com/static/downloads/brand-guidelines/PNG/logo-logomark.png",
  },
  {
    name: "Socket.io",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Socket-io.svg",
  },
  {
    name: "Git",
    url: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
  },
  {
    name: "Material UI",
    url: "https://seeklogo.com/images/M/material-ui-logo-5BDCB9BA8F-seeklogo.com.png",
  },
  {
    name: "NPM",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/540px-Npm-logo.svg.png",
  },
  {
    name: "HTML",
    url: "https://cdn-icons-png.flaticon.com/512/174/174854.png?w=360",
  },
  {
    name: "CSS",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png",
  },
];

const Home = () => {
  const [section, setSection] = useState("about");
  const [loader, setLoader] = useState(true);

  window.addEventListener("scroll", () => {
    console.log("Scrolling... " + window.scrollY);
    if (window.scrollY >= 395) {
      setSection("skills");
    } else if (window.scrollY >= 0 && window.scrollY < 395) {
      setSection("about");
    }
  });

  let loadtime;
  useEffect(() => {
    loadtime = setInterval(() => {
      setLoader(false);
    }, 2000);

    return () => {
      clearInterval(loadtime);
    };
  }, []);

  return (
    <div style={{ overflow: loader && "hidden" }} className="home-page">
      <Loading />
      <div className={`${section} bg-container`}>{section}</div>
      <div className="about-section">
        <p className="info-para">
          I am a <span>Frontend Web Developer</span> who loves to work hands-on
          <br /> — based in India.
        </p>
      </div>

      <div className="skills-section">
        <div className="skills-list">
          {skills.map((skill, i) => {
            return (
              <div className="skill-cont">
                <div className="skill-img">
                  <img src={skill.url} alt={skill.name} />
                </div>
                <div className="skill-name">{skill.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
