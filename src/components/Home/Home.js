import React, { useEffect, useState } from "react";
import AnimatedText from "react-animated-text-content";
import Particle from "../Contact/Particle";
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

const list = ["Frontend Web Developer", "Web3 and ML Enthusiast"];

const Home = () => {
  const [section, setSection] = useState("about");
  const [loader, setLoader] = useState(true);
  const [about, setAbout] = useState(2);

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

  let time;
  useEffect(() => {
    time = setInterval(() => {
      setAbout((prev) => prev + 1);
    }, 5000);

    return () => {
      clearInterval(time);
    };
  }, [about]);

  return (
    <div style={{ overflow: loader && "hidden" }} className="home-page">
      <Loading />
      <Particle />
      <div className={`${section} bg-container`}>{section}</div>
      <div className="sections about-section">
        <p className="info-para">
          I am a{" "}
          <span>
            {about % 2 === 0 ? (
              <AnimatedText
                type="words"
                animation={{
                  x: "200px",
                  y: "-20px",
                  scale: 1.1,
                  ease: "ease-in-out",
                }}
                animationType="lights"
                interval={0.01}
                duration={0.6}
                tag="span"
                className="animated-paragraph"
                includeWhiteSpaces
                threshold={0.1}
                rootMargin="20%"
              >
                {list[about % list.length]}
              </AnimatedText>
            ) : (
              <AnimatedText
                type="words"
                animation={{
                  x: "200px",
                  y: "-10px",
                  scale: 1.1,
                  ease: "ease-in-out",
                }}
                animationType="lights"
                interval={0.01}
                duration={0.6}
                tag="span"
                className="animated-paragraph"
                includeWhiteSpaces
                threshold={0.1}
                rootMargin="20%"
              >
                {list[about % list.length] + " "}
              </AnimatedText>
            )}
          </span>
          <br />
          who loves to work hands-on
          <br /> — based in India.
        </p>
      </div>

      <div className="sections skills-section">
        <div className="skills-list">
          {skills.map((skill, i) => {
            return (
              <div key={i} className="skill-cont">
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
