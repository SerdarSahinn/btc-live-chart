import React from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import { usePriceData } from "./hooks/usePriceData";
import { PriceHeader } from "./components/PriceHeader";
import { LiveChart } from "./components/LiveChart";

function App() {
  const { data, lastPrice, changePercent, isUp, high, low, handleMessage } = usePriceData();
  const { status } = useWebSocket(handleMessage);

  return (
    <div className="w-full min-h-screen bg-slate-900 p-6">
      <PriceHeader
        lastPrice={lastPrice}
        changePercent={changePercent}
        isUp={isUp}
        status={status}
        high={high}
        low={low}
      />
      <LiveChart data={data} isUp={isUp} />
    </div>
  );
}

export default App;