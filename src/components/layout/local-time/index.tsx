'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Ho_Chi_Minh',
});

/** Current time in Ho Chi Minh City; shows a placeholder until mounted to avoid a hydration mismatch. */
const LocalTime = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? '--:--'}
    </span>
  );
};

export default LocalTime;
