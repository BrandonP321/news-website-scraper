import React, { useEffect } from "react";
import "./App.module.scss";
import axios from "axios";

function App() {
  useEffect(() => {
    const url =
      "https://apnews.com/article/venezuela-edmundo-gonzalez-arrest-warrant-d34272422cddb42c1dde9166539a85d5";

    axios
      .get(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div className="App">HI</div>;
}

export default App;
