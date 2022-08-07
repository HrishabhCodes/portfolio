import React from "react";
import Loading from "../Loading/Loading";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <Loading />
      <h1 className="contact-header">GET IN TOUCH</h1>
      <div className="contact-container">
        <div className="form-container">
          <form className="form">
            <div className="sender">
              <div className="name-container">
                <input
                  required
                  placeholder="Name"
                  className="text-inputs name"
                  type="text"
                />
                <span className="underline-animation"></span>
              </div>
              <div className="mail-container">
                <input
                  required
                  placeholder="Email"
                  className="text-inputs mail"
                  type="text"
                />
                <span className="underline-animation"></span>
              </div>
            </div>
            <div className="subject-container">
              <input
                required
                placeholder="Subject"
                className="text-inputs subject"
                type="text"
              />
              <span className="underline-animation"></span>
            </div>
            <div className="message-container">
              <textarea
                required
                placeholder="Message"
                className="message"
                name="message"
                id="message"
                cols="30"
                rows="10"
              ></textarea>
              <span className="underline-animation"></span>
            </div>
            <div className="submit-btn">
              <input value="Send" className="send-btn" type="submit" />
            </div>
          </form>
        </div>
        <div className="socials">
          <div className="para">
            If you have any questions, please feel free to drop me a line. If
            you don't get an answer immediately, I might just be travelling
            through the middle of nowhere. I'll get back to you as soon as I
            can. That's a promise!
          </div>
          <div className="social-menu">
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/hrishabh-jain/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="handles-icon fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/hrishabhcodes" target="blank">
                  <i className="handles-icon fa-brands fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/hrishabh.hj/"
                  rel="noopener noreferrer"
                  target="blank"
                >
                  <i className="handles-icon fa-brands fa-instagram"></i>
                </a>
              </li>

              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="mailto:hrishabh507@gmail.com"
                >
                  <i className="handles-icon fa-solid fa-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="social-icons">
            <i className="fa-solid fa-heart"></i>
            <i className="fa-solid fa-comment"></i>
            <i className="fa-solid fa-share"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
