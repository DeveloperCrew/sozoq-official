"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export default function Clock() {
  // placeholder has the same width as the real time, so nothing jumps on load
  const [time, setTime] = useState("--:--:-- --");

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {time}
      <span className="clock__tz"> IST+5:30</span>
    </>
  );
}
