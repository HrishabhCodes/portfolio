import React, { useEffect, useState } from "react";
import { projects } from "./projectsList";
import "./Projects.css";

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(0);

  let time;
  useEffect(() => {
    time = setInterval(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearInterval(time);
    };
  }, [loading]);

  const handleProjects = (number) => {
    if (number !== project) {
      setLoading(true);
    }

    setTimeout(() => {
      setProject(number);
    }, 900);
  };

  return (
    <div className="proj-container">
      {loading ? (
        <div className="transition">
          <div className="bar1 bars"></div>
          <div className="bar2 bars"></div>
          <div className="bar3 bars"></div>
          <div className="bar4 bars"></div>
          <div className="bar5 bars"></div>
          <div className="bar6 bars"></div>
          <div className="bar7 bars"></div>
        </div>
      ) : null}

      <ul className="proj-menu">
        {projects.map((pro, i) => {
          return (
            <li
              key={i}
              onClick={(e) => handleProjects(i)}
              className={i === project ? "active circle" : "circle"}
            >
              <span className="icon">
                <i className={pro.classes}></i>
              </span>
              <span className="title">{pro.name}</span>
            </li>
          );
        })}
      </ul>

      <div className="proj-description">
        <h1 className="proj-name">{projects[project].name}</h1>
        <div className="proj-links">
          <a target="_blank" href={projects[project].code} className="btn code">
            <i className="fa-brands fa-github"></i>
            CODE
          </a>
          <a target="_blank" href={projects[project].live} className="btn live">
            <i className="fa-solid fa-globe"></i>
            LIVE
          </a>
        </div>
        <div className="proj-info">{projects[project].description}</div>
        <div className="stack">
          {projects[project].stack.map((tech, i) => {
            return (
              <div key={i} className="stack-container">
                <a target="_blank" title={tech.name} href={tech.website}>
                  <img className="stack-image" src={tech.url} alt={tech.name} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          background: `url(${projects[project].image})`,
        }}
        className="proj-image"
      ></div>
    </div>
  );
};

export default Projects;
