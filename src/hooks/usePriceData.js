import { useCallback, useRef, useState } from "react";

const MAX_DATA_POINTS = 50;

export function usePriceData() {
  const [data, setData] = useState([]);
  const sessionStartPrice = useRef(null);
  const lastUpdateTime = useRef(0);
  const highPrice = useRef(null);
  const lowPrice = useRef(null);

  const handleMessage = useCallback((message) => {
    const now = Date.now();
    if (now - lastUpdateTime.current < 1000) return;
    lastUpdateTime.current = now;

    const price = parseFloat(message.p);
    const volume = parseFloat(message.q);
    const time = new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    if (sessionStartPrice.current === null) {
      sessionStartPrice.current = price;
    }

    // High / Low güncelle
    if (highPrice.current === null || price > highPrice.current) {
      highPrice.current = price;
    }
    if (lowPrice.current === null || price < lowPrice.current) {
      lowPrice.current = price;
    }

    setData((prev) => {
      const updated = [...prev, { time, price, volume }];
      if (updated.length > MAX_DATA_POINTS) updated.shift();
      return updated;
    });
  }, []);

  const lastPrice = data.length > 0 ? data[data.length - 1].price : null;
  const startPrice = sessionStartPrice.current;
  const change = startPrice && lastPrice ? lastPrice - startPrice : 0;
  const changePercent = startPrice && lastPrice
    ? ((change / startPrice) * 100).toFixed(2)
    : "0.00";
  const isUp = change >= 0;

  return {
    data,
    lastPrice,
    change,
    changePercent,
    isUp,
    high: highPrice.current,
    low: lowPrice.current,
    handleMessage,
  };
}