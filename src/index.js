import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import useDarkMode from './hooks/useDarkMode.js'
import Charts from "./components/Charts";
import Navbar from "./components/Navbar";

import "./styles.scss";

const App = () => {
  function useLocalState(localItem) {
    const [loc, setState] = useState(() => {
      if (window.localStorage.getItem(localItem)) {
        return JSON.parse(window.localStorage.getItem(localItem));
      }
      window.localStorage.setItem(localItem, JSON.stringify(loc))
    });
    function setLoc(newItem) {
      localStorage.setItem(localItem, newItem)
      setState(newItem);
    }
    return [loc, setLoc];
  }

  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useLocalState('darkMode');


  const toggleMode = e => {
    e.preventDefault();
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      <Navbar toggleMode={toggleMode} darkMode={darkMode} />
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
