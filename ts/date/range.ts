import dayjs from 'dayjs';

// 是否包含今天当天
export function getRecentDaysRange(x: number, includeToday: boolean = true): [string, string] {
  let endDate;
  if (includeToday) {
    endDate = dayjs().endOf('day').toISOString();
  } else {
    endDate = dayjs().subtract(1, 'day').endOf('day').toISOString();
  }
  const startDate = dayjs()
    .subtract(x - 1, 'day')
    .startOf('day')
    .toISOString();
  // 返回一个ISO 8601格式的字符串
  return [startDate, endDate];
}

export function getRecentMonthsRange(x: number, includeToday: boolean = true): [string, string] {
  let endDate;
  if (includeToday) {
    endDate = dayjs().endOf('day').toISOString();
  } else {
    endDate = dayjs().subtract(1, 'day').endOf('day').toISOString();
  }
  const startDate = dayjs().subtract(x, 'month').startOf('day').toISOString();
  return [startDate, endDate];
}
