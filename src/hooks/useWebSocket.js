import { useEffect, useRef, useState } from "react";

const WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const RECONNECT_DELAY = 3000;

export function useWebSocket(onMessage) {
  const ws = useRef(null);
  const reconnectTimer = useRef(null);
  const [status, setStatus] = useState("connecting");

  const connect = () => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      setStatus("connected");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    ws.current.onerror = () => {
      setStatus("disconnected");
    };

    ws.current.onclose = () => {
      setStatus("reconnecting");
      reconnectTimer.current = setTimeout(() => {
        connect();
      }, RECONNECT_DELAY);
    };
  };

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimer.current);
      ws.current?.close();
    };
  }, []);

  return { status };
}