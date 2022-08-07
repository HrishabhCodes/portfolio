import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import "./Loading.css";

const Loading = () => {
  const [load, setLoad] = useState("enter");

  let time;
  useEffect(() => {
    time = setInterval(() => {
      setLoad("exit");
    }, 1400);

    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <div
      className={load === "enter" ? "enter loading-page" : "exit loading-page"}
    >
      <div className="logo-container">
        <div className="logo-img">
          <img src={Logo} alt="logo" />
        </div>
        <div className="name">Hrishabh</div>
      </div>
      <div className="progress-container">
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Loading;
