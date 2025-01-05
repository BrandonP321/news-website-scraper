import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { ArticleScraper } from "./ArticleScraper";
import { Button } from "react-bootstrap";

const customGPTUrl =
  "https://chatgpt.com/g/g-677a34722478819182415ab276a656f0-intelligence-briefing-assistant";

function App() {
  const [scrapersCount, setScrapersCount] = useState(1);

  useEffect(() => {}, []);

  return (
    <div className={styles.app}>
      <div className={styles.btnWrapper}>
        <Button href={customGPTUrl} target="_blank" className={styles.leftBtn}>
          Go to ChatGPT
        </Button>
        <Button onClick={() => setScrapersCount(scrapersCount + 1)}>
          Add Article Scraper
        </Button>
      </div>
      {Array.from({ length: scrapersCount }).map((_, index) => (
        <ArticleScraper key={index} />
      ))}
    </div>
  );
}

export default App;
