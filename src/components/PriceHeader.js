import React from "react";

export function PriceHeader({ lastPrice, changePercent, isUp, status, high, low }) {
  const statusConfig = {
    connected: { color: "text-green-400", dot: "bg-green-400", text: "LIVE" },
    connecting: { color: "text-yellow-400", dot: "bg-yellow-400", text: "BAĞLANIYOR" },
    reconnecting: { color: "text-yellow-400", dot: "bg-yellow-400", text: "YENİDEN BAĞLANIYOR" },
    disconnected: { color: "text-red-400", dot: "bg-red-400", text: "BAĞLANTI KESİLDİ" },
  };

  const s = statusConfig[status] || statusConfig.connecting;
  const priceColor = isUp ? "text-green-400" : "text-red-400";
  const arrow = isUp ? "▲" : "▼";

  const fmt = (val) =>
    val
      ? `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : "-";

  return (
    <div className="mb-6">
      {/* Üst Satır */}
      <div className="flex items-start justify-between">
        {/* Sol */}
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Binance</p>
          <h1 className="text-white text-2xl font-bold tracking-wide">BTC / USDT</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`text-4xl font-bold ${priceColor}`}>
              {lastPrice ? fmt(lastPrice) : "Yükleniyor..."}
            </span>
            {lastPrice && (
              <span className={`text-sm font-semibold px-2 py-1 rounded-md ${isUp ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>
                {arrow} %{changePercent}
              </span>
            )}
          </div>
        </div>

        {/* Sağ — Bağlantı */}
        <div className={`flex items-center gap-2 text-sm font-medium ${s.color}`}>
          <span className={`w-2 h-2 rounded-full ${s.dot} ${status === "connected" ? "animate-pulse" : ""}`} />
          {s.text}
        </div>
      </div>

      {/* Alt Satır — High / Low */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">24s Yüksek</span>
          <span className="text-green-400 text-sm font-semibold">{fmt(high)}</span>
        </div>
        <div className="w-px h-4 bg-slate-600" />
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">24s Düşük</span>
          <span className="text-red-400 text-sm font-semibold">{fmt(low)}</span>
        </div>
      </div>
    </div>
  );
}