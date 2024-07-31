const DAYS = [
  "星期天",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

function getDay() {
  const day = new Date().getDay();

  return DAYS[day];
}

export default getDay;
