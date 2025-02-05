import { useState, useEffect } from "react";

export const MyDate = ({ selectedDateFormat }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour24 = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const date = time.getDate().toString().padStart(2, "0");
  const month = (time.getMonth() + 1).toString().padStart(2, "0");

  const daysInChinese = [
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
  ];
  const daysInKorean = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const daysInEnglish = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDayCN = daysInChinese[time.getDay()];
  const currentDayKR = daysInKorean[time.getDay()];
  const currentDayEN = daysInEnglish[time.getDay()];

  let formattedDate;

  switch (selectedDateFormat) {
    case "chineseOnly":
      formattedDate = `[ ${currentDayCN} | ${date}/${month} | ${hour24}:${minute}:${seconds} ]`;
      break;
    case "koreanOnly":
      formattedDate = `[ ${currentDayKR} | ${date}/${month} | ${hour24}:${minute}:${seconds} ]`;
      break;
    case "chineseKorean":
      formattedDate = `[ ${currentDayCN} | ${currentDayKR} | ${date}/${month} | ${hour24}:${minute}:${seconds} ]`;
      break;
    case "englishOnly":
    default:
      formattedDate = `[ ${currentDayEN} | ${date}/${month} | ${hour24}:${minute}:${seconds} ]`;
      break;
  }

  return (
    <div className="w-full text-right">
      <p>{formattedDate}</p>
    </div>
  );
};
