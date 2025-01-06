import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { ArticleScraper } from "./ArticleScraper";
import { Button } from "react-bootstrap";

const customGPTUrl =
  "https://chatgpt.com/g/g-677a34722478819182415ab276a656f0-intelligence-briefing-assistant";

let hasRunOnce = false;

function App() {
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [scrapersCount, setScrapersCount] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urls = searchParams.getAll("url");
    setScrapersCount(urls.length || 1);
    setInputValues(urls);
    console.log(urls);
  }, []);

  const updateAllSearchParams = (urls?: string[]) => {
    const searchParams = new URLSearchParams();
    (urls ?? inputValues).forEach((url) =>
      searchParams.append("url", url ?? "")
    );
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`
    );
  };

  const deleteScraper = (index: number) => {
    setInputValues((prev) => {
      const newValues = [...prev];
      newValues.splice(index, 1);
      updateAllSearchParams(newValues);

      return newValues;
    });
    setScrapersCount(scrapersCount - 1);
  };

  useEffect(() => {
    if (hasRunOnce) {
      updateAllSearchParams();
    } else {
      hasRunOnce = true;
    }
  }, [inputValues]);

  const setInput = (index: number, value: string) => {
    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

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
        <ArticleScraper
          key={index}
          deleteScraper={() => deleteScraper(index)}
          updateValue={(v) => setInput(index, v)}
          input={inputValues[index]}
        />
      ))}
    </div>
  );
}

export default App;
