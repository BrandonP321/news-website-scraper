import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { ArticleScraper } from "./ArticleScraper";
import { Button } from "react-bootstrap";

function App() {
  const [scrapersCount, setScrapersCount] = useState(1);

  useEffect(() => {}, []);

  return (
    <div className={styles.app}>
      <div className={styles.btnWrapper}>
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
