import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * utc时间范围格式转换
 *
*/
const formatUtcDates = (dateStrings: string[], separator: string = '至'): string => {
  if (!dateStrings || dateStrings.length < 2) return '';

  const formattedStartDate = formatDate(dateStrings[0]);
  const formattedEndDate = formatDate(dateStrings[1]);

  return formattedStartDate && formattedEndDate
    ? `${formattedStartDate} ${separator} ${formattedEndDate}`
    : formattedStartDate || formattedEndDate || '';
}

/**
 * utc时间范围格式转换
 *
*/
const formatUtcDate = (dateString: string): string => {
  return dateString ? formatDate(dateString) : '';
}

function toUTCISOString(localDateString: string): string {
  const currentDate = new Date(localDateString);

  // 获取UTC年份、月份、日期、小时、分钟、秒和毫秒
  const utcYear = currentDate.getUTCFullYear();
  const utcMonth = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // 月份从0开始，加1并补零
  const utcDay = String(currentDate.getUTCDate()).padStart(2, '0');
  const utcHours = String(currentDate.getUTCHours()).padStart(2, '0');
  const utcMinutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
  const utcSeconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
  const utcMilliseconds = String(currentDate.getUTCMilliseconds()).padStart(3, '0');
  return `${utcYear}-${utcMonth}-${utcDay}T${utcHours}:${utcMinutes}:${utcSeconds}.${utcMilliseconds}Z`;
}

// 将UTC时间转换为CST时间
function convertUTCToCST(utcDateString: string): string {
  if (!utcDateString) return '';
  // 匹配UTC时间字符串并提取年、月、日、时、分、秒
  const match = utcDateString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?Z$/);
  if (!match) {
    throw new Error('Invalid UTC date string');
  }
  const [, year, month, day, hour, minute, second] = match;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 获取近一个月时间
function getMonthRange() {
  const now = dayjs.utc(); // 创建一个UTC时间的dayjs实例
  const oneMonthAgo = now.clone().subtract(1, 'month'); // 使用clone()避免修改原始now对象
  // const startDate = oneMonthAgo.format('YYYY-MM-DD');
  // const endDate = now.format('YYYY-MM-DD');
  return [oneMonthAgo, now];
}

export {
  formatUtcDates,
  formatUtcDate,
  toUTCISOString,
  convertUTCToCST,
  getMonthRange
}