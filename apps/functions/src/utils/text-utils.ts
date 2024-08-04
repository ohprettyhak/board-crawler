import { formatTime } from "@/utils/date-utils";

export const cleanCrawledText = (
  input: string,
  formatType: "title" | "timestamp" | "author" | "default" = "default",
): string => {
  let formattedText: string = input.trim();

  const removePrefix = (prefix: string): void => {
    const prefixRegex: RegExp = new RegExp(`^${prefix}\\s*.*?:\\s*`);
    formattedText = formattedText.replace(prefixRegex, "");
  };

  switch (formatType) {
    case "title":
      removePrefix("제목");
      break;

    case "timestamp": {
      const dateMatch: RegExpMatchArray | null = formattedText.match(
        /^작성일\s*:\s*(\d{2,4})\.(\d{2})\.(\d{2})/,
      );
      if (dateMatch) {
        const [, year, month, day] = dateMatch;
        const fullYear: string = year.length === 2 ? `20${year}` : year;
        formattedText = `${fullYear}-${month}-${day}`;
      } else {
        formattedText = formatTime("YYYY-MM-DD");
      }
      break;
    }

    case "author":
      removePrefix("작성자");
      removePrefix("글쓴이");
      break;

    default:
      break;
  }

  return formattedText;
};
