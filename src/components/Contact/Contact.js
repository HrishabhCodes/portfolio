import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Loading from "../Loading/Loading";
import "./Contact.css";

const YOUR_SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const YOUR_TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const YOUR_PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setSent(false);
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, [sent]);

  const sendEmail = (e) => {
    e.preventDefault();
    setSent(true);
    emailjs
      .sendForm(
        `${YOUR_SERVICE_ID}`,
        `${YOUR_TEMPLATE_ID}`,
        form.current,
        `${YOUR_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    form.current.reset();
  };

  return (
    <div className="contact-page">
      <Loading />
      <h1 className="contact-header">GET IN TOUCH</h1>
      <div className="contact-container">
        <div className="form-container">
          <form ref={form} onSubmit={sendEmail} className="form">
            <div className="sender">
              <div className="name-container">
                <input
                  name="user_name"
                  autoComplete="none"
                  required
                  placeholder="Name"
                  className="text-inputs name"
                  type="text"
                />
                <span className="underline-animation"></span>
              </div>
              <div className="mail-container">
                <input
                  name="user_email"
                  autoComplete="none"
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
                name="subject"
                autoComplete="none"
                required
                placeholder="Subject"
                className="text-inputs subject"
                type="text"
              />
              <span className="underline-animation"></span>
            </div>
            <div className="message-container">
              <textarea
                autoComplete="none"
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
              <button className="send-btn" type="submit">
                {sent ? (
                  <span className="sent">
                    <i class="fa-solid fa-check"></i>
                  </span>
                ) : (
                  <span className="unsent">Send</span>
                )}
              </button>
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
