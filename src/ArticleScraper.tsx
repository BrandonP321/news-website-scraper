import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import styles from "./ArticleScraper.module.scss";

const APIEndpoint = process.env.REACT_APP_API_DOMAIN!;

type ScrapedData = {
  content: string;
  title: string;
  authors: string[];
  publishedDate: string;
};

export function formatArticleDataForChatGPT(articleData: ScrapedData): string {
  const { title, authors, content, publishedDate } = articleData;

  // Format authors in a simple numbered list
  const authorsFormatted = authors
    .map((author, idx) => `  ${idx + 1}. ${author}`)
    .join("\n");

  // Build a single string with clear labels and line breaks
  const articleString = [
    `=== Article Title ===`,
    title || "(No title provided)",

    `\n=== Authors ===`,
    authors.length > 0 ? authorsFormatted : "  (No authors found)",

    `\n=== Published Date ===`,
    publishedDate || "(Date not found)",

    `\n=== Article Content ===`,
    content || "(No content found)",
  ].join("\n");

  return articleString;
}

async function getScrapedData(url: string): Promise<ScrapedData> {
  const response = await axios.post(APIEndpoint, { url });
  return response.data as ScrapedData;
}

type Props = {};

export function ArticleScraper(props: Props) {
  const [input, setInput] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isCopySuccessful, setIsCopySuccessful] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [article, setArticle] = useState<ScrapedData | null>(null);

  useEffect(() => {
    const url =
      "https://apnews.com/article/venezuela-edmundo-gonzalez-arrest-warrant-d34272422cddb42c1dde9166539a85d5";
  }, [input]);

  const scrapeArticle = useCallback(async () => {
    setArticle(null);
    setErrMsg(null);

    try {
      await getScrapedData(input).then((data) => {
        console.log(data);
        setArticle(data);
      });
    } catch (error) {
      console.error(error);
      setErrMsg("Failed to scrape article");
    }
  }, [input]);

  const handleCopy = useCallback(() => {
    if (article) {
      navigator.clipboard.writeText(formatArticleDataForChatGPT(article));
      setIsCopySuccessful(true);
    } else {
      setIsCopySuccessful(false);
    }

    setShowTooltip(true);

    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  }, [article]);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {isCopySuccessful ? "Copied!" : "Copy failed"}
    </Tooltip>
  );

  return (
    <div className={styles.scraperContainer}>
      <h2>{article?.title ?? "New Article"}</h2>
      <InputGroup>
        <Form.Control
          placeholder="Article URL"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={scrapeArticle}>Scrape Article</Button>
      </InputGroup>
      {errMsg && <Form.Text className={styles.errMsg}>{errMsg}</Form.Text>}
      {article && !errMsg && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
          show={showTooltip}
        >
          <Button onClick={handleCopy} className={styles.copyBtn}>
            Copy Article Data
          </Button>
        </OverlayTrigger>
      )}
    </div>
  );
}
