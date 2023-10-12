import React, { useEffect } from "react";
import "./App.css";

import {
  trackOnPageLoad,
  trackOnViewportEnter,
  trackTimeSpendOnPage,
  trackPageExit,
  trackAdClicked,
} from "./service/eventTracker";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

function generalPageEvents() {
  const currentUrl = window.location.href;
  trackOnPageLoad(currentUrl);
  trackPageExit();
  const startTime = performance.now();
  return () => {
    trackTimeSpendOnPage(startTime, currentUrl);
  };
}

function addOnViewportEnter(elementId, adPosition) {
  let element = document.querySelector(elementId);
  trackOnViewportEnter(element, adPosition);
}

export function Home() {
  useEffect(() => {
    const callbackFunc = generalPageEvents();
    return callbackFunc;
  });
  return (
    <div className="Content">
      <h2>Welcome to the Home Page</h2>
      <p>This is the main content of the home page.</p>
    </div>
  );
}

export function About() {
  useEffect(() => {
    const callbackFunc = generalPageEvents();
    return callbackFunc;
  });
  return (
    <div className="Content">
      <h2>About Us</h2>
      <p>Learn more about our company.</p>
    </div>
  );
}

function Services() {
  useEffect(() => {
    const callbackFunc = generalPageEvents();
    return callbackFunc;
  });
  return (
    <>
      <div className="Content long">
        <h2>Our Services</h2>
        <p>Explore the services we offer.</p>
      </div>
    </>
  );
}

function Contact() {
  useEffect(() => {
    const callbackFunc = generalPageEvents();
    return callbackFunc;
  });
  return (
    <div className="Content">
      <h2>Contact Us</h2>
      <p>Get in touch with us.</p>
    </div>
  );
}

function App() {
  useEffect(() => {
    document.querySelector("#bottom-ad-place").onclick = () => {
      trackAdClicked("Bottom");
    };
    document.querySelector("#header-ad-place").onclick = () => {
      trackAdClicked("Header");
    };
    document.querySelector("#side-ad-place").onclick = () => {
      trackAdClicked("Side");
    };
    addOnViewportEnter("#side-ad-place", "Side");
    addOnViewportEnter("#bottom-ad-place", "Bottom");
    addOnViewportEnter("#header-ad-place", "Header");
  });
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <header className="Header">
            <h1>Homework Assignment</h1>
            <div id="header-ad-place" className="header-ad">
              Ad Space
            </div>
            <nav className="Menu">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </header>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <div id="side-ad-place" className="side-ad">
            Ad Space
          </div>
          <footer className="Footer">
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
            <div id="bottom-ad-place" className="ad-placeholder">
              <img src="/images/original.png" alt="Advertisement" />
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
