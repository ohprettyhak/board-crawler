import { formatTime } from '@/utils/date-utils';

export const cleanCrawledText = (
  input: string,
  formatType: 'title' | 'timestamp' | 'author' | 'default' = 'default',
): string => {
  let formattedText: string = input.trim();

  const cleanText = (prefixes: string[]): void => {
    for (const prefix of prefixes) {
      const prefixRegex: RegExp = new RegExp(`^${prefix}\\s*:?\\s*(.*)`);
      const match = formattedText.match(prefixRegex);
      if (match) {
        formattedText = match[1].trim();
        break;
      }
    }
  };

  switch (formatType) {
    case 'title': {
      cleanText(['제목']);
      break;
    }
    case 'timestamp': {
      const dateMatch: RegExpMatchArray | null = formattedText.match(
        /^작성일\s*:\s*(\d{2,4})\.(\d{2})\.(\d{2})/,
      );
      if (dateMatch) {
        const [, year, month, day] = dateMatch;
        const fullYear: string = year.length === 2 ? `20${year}` : year;
        formattedText = `${fullYear}-${month}-${day}`;
      } else {
        formattedText = formatTime('YYYY-MM-DD');
      }
      break;
    }
    case 'author': {
      cleanText(['작성자', '글쓴이']);
      const authorMatch: RegExpMatchArray | null = formattedText.match(/^(\w+)/);
      if (authorMatch) {
        formattedText = authorMatch[1];
      }
      break;
    }
    default:
      break;
  }

  return formattedText;
};
