// 判断一年有多少周
function getISOWeekCount(year:number) {
  const firstDayOfYear = new Date(year, 0, 1);
  const dayOfWeek = firstDayOfYear.getDay();
  if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
    return 53; // 1月1日是星期五、星期六或星期日
  }
  return 52; // 1月1日是星期一、星期二、星期三或星期四

}

// 获取当前是第几周
export function getWeekNumber(dateString: string): string {
  const date = new Date(dateString);
  const adjustedDate = new Date(date);
  adjustedDate.setHours(0, 0, 0, 0);
  const year = adjustedDate.getFullYear();
  const firstDayOfYear = new Date(year, 0, 1);
  const firstDayOfWeek = firstDayOfYear.getDay();
  const dayOfYear = Math.floor((adjustedDate.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((dayOfYear + firstDayOfWeek) / 7);
  if (weekNumber > getISOWeekCount(year)) {
    return `${year + 1}年第1周`;
  }
  return `${year}年第${weekNumber}周`;
}
