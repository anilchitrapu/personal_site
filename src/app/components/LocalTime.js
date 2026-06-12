'use client';

import { useEffect, useState } from 'react';

export default function LocalTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Render a stable placeholder on the server to avoid hydration mismatch
  return <span className="clock">nyc {time ?? '--:--:--'}</span>;
}
