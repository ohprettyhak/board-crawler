import dayjs, { Dayjs, locale } from 'dayjs';
import 'dayjs/locale/ko';

locale('ko');

export const formatTime = (
  format: string,
  time: string | Date | Dayjs = dayjs(),
  locale: string = 'ko',
) => {
  return dayjs(time).locale(locale).format(format);
};
