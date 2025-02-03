import { useState, useEffect } from "react";

export const MyDate = () => {
  const [time, setTime] = useState(new Date());
  const language = "KR"; // Change this to "KR" for Korean or "CN" for Chinese

  useEffect(() => {
    // Updates every second instead of every millisecond for efficiency
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Time formatting
  const hour24 = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const date = `${time.getDate().toString().padStart(2, "0")}`;
  const month = `${(time.getMonth() + 1).toString().padStart(2, "0")}`;

  // Day translation arrays
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
  const currentDayCN = daysInChinese[time.getDay()];
  const currentDayKR = daysInKorean[time.getDay()];

  return (
    <div className="w-full text-right">
      <p>
        [ {currentDayCN} | {currentDayKR} | {date}
        /{month} | {hour24}:{minute}:{seconds} ]
      </p>
    </div>
  );
};
