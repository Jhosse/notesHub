import * as cheerio from "cheerio";

import { IUrlMetadata } from "../../../@types/custom/utils";

export const getUrlMetadata = async (
  url: string
): Promise<IUrlMetadata | null> => {
  try {
    const response = await fetch(url);
    const htmlContent = await response.text();
    const $ = cheerio.load(htmlContent);

    const getData = (property: string): string | null => {
      return (
        $(`meta[property="og:${property}"]`).attr("content") ||
        $(`meta[name="og:${property}"]`).attr("content") ||
        $(`meta[name="twitter:${property}"]`).attr("content") ||
        null
      );
    };

    return {
      ogImage: getData("image"),
      ogTitle: getData("title"),
      ogDescription: getData("description"),
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
