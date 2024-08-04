import axios from "axios";
import * as cheerio from "cheerio";

import { ArticleCrawlType } from "@/types/article";
import { cleanCrawledText } from "@/utils/text-utils";

export const fetchBoardUrls = async (boardUrl: string): Promise<string[]> => {
  try {
    const response = await axios.get(boardUrl);
    const $ = cheerio.load(response.data);

    return $("table tbody tr td a")
      .map((_, element) => $(element).attr("href"))
      .get()
      .filter((url): url is string => url !== undefined && url !== null);
  } catch (error) {
    console.error("Failed to fetch URLs from the board:", error);
    throw error;
  }
};

export const fetchArticleContent = async (url: string): Promise<ArticleCrawlType> => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title: string = cleanCrawledText($(".tit").text() || $(".view-title").text(), "title");

    const content: string = cleanCrawledText($("td > #divView").text() || $(".view-con").text());

    const timestamp: string = cleanCrawledText(
      $(".viewTop > .id").text() || $(".view-util > .write").text(),
      "timestamp",
    );

    const author: string = cleanCrawledText(
      $("tr > .no").text() || $(".view-util > .writer").text(),
      "author",
    );

    return { title, content, timestamp, author };
  } catch (error) {
    console.error("Failed to fetch article content:", error);
    throw error;
  }
};
