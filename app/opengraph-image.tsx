import { ImageResponse } from "next/og";

export const alt = "WAYS Levallois — À ta façon. À fond.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjcwIDIzMCA5ODAgMjAwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IldBWVMiPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLC0xLDAsNzAwKSIgZD0iTTExNy4wMzQ2IDQ2MUg3M0w5MC42MTM4MyAyODQuODYxN0gxMzYuMjc5M0wxNzUuNDAzMiAzNTMuNTMxMiAxNjIuODU2NiA0MDcuNDUwNyAxMTguNTAyNCAzNDAuMzEyNyAxMTcuMDM0NiA0NjFaTTE5Ni42MjMgMjg0Ljg2MTdIMjQwLjY1NzVMMzI5LjA1MjkgNDYxSDI4MC4xMjU2TDIxOS42MTg4IDM0MC4zMTI3IDIwOC4yODQgNDE2Ljk2NTRIMTY1Ljg4MDNMMTk2LjYyMyAyODQuODYxN1oiIGZpbGw9IiNmM2VmZTciIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLC0xLDAsNzAwKSIgZD0iTTI0MC42NTc1IDI4NC44NjE3IDMyOS4wNTI5IDQ2MUgyODAuMTI1NkwyNDEuNTk2OSAzODQuMTQ5OSAyMjEuNzM5IDI4NC44NjE3SDI0MC42NTc1WiIgZmlsbD0iI2MxOGY2YSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsLTEsMCw3MDApIiBkPSJNNDM0Ljc4NDggMjk3LjA5MzYgNDY5LjIxNDkgMzU0LjcyOTkgNDgzLjMyMDYgMjk3LjA5MzZINTE5LjcyMjVMNTgxLjkwOTEgNDQ4Ljc2ODJINTQ3LjAyNEw1MDEuNTk3NCAzMzguMDQ1NyA0OTQuNzcyMSA0MTMuODgzSDQ2Mi45MjA0TDQxOS42OTMxIDMzOC4wNDU3IDQyMS4xMzQgNDQ4Ljc2ODJIMzg3Ljc2NTZMMzk4LjM4MjggMjk3LjA5MzZINDM0Ljc4NDhaTTYyNy40MTE1IDMyNy40Mjg1SDY3OC45ODA5TDY4My41MzExIDI5Ny4wOTM2SDcxOS45MzNMNjk0LjE0ODQgNDQ4Ljc2ODJINjUzLjE5NjJMNTc3LjM1ODkgMjk3LjA5MzZINjEzLjc2MDhMNjI3LjQxMTUgMzI3LjQyODVaTTY0Mi41NzkgMzU3Ljc2MzQgNjY1LjI1NDMgNDA3LjgxNiA2NzQuNDMwNyAzNTcuNzYzNEg2NDIuNTc5Wk03NzkuMDg2MiAyOTcuMDkzNkg4MTUuNDg4MUw4MjQuMzYxIDM1Ni4yNDY3IDg5MS4zMjU0IDQ0OC43NjgySDg1My40MDY3TDgxMS44NDc5IDM5NC4xNjUzIDc4OS43MDM0IDQ0OC43NjgySDc1MS43ODQ3TDc4Ny45NTkxIDM1Ni4yNDY3IDc3OS4wODYyIDI5Ny4wOTM2Wk05MDIuNjI1MSA0MjIuOTgzNSA4OTYuNzA5OCAzODMuNTQ4MSA5MTguODU0MyAzNTkuMjgwMUg5ODguNjI0Nkw5OTYuMzYwMSAzNTAuMTc5NyA5OTMuNjI5OSAzMzEuOTc4N0g5MjMuODU5Nkw5MjUuOTA3MiAzNDUuNjI5NEg4OTEuMDIyTDg4Ny42MDkzIDMyMi44NzgyIDkwOS41MjYzIDI5Ny4wOTM2SDk5OS4wMTQ0TDEwMzAuNDExIDMyNC4zOTUgMTAzNi4zMjYgMzYzLjgzMDQgMTAxNC40MDkgMzg5LjYxNTFIOTQxLjYwNTVMOTM1LjE1OTMgMzk3LjE5ODggOTM3LjY2MiA0MTMuODgzSDEwMDQuMzk5TDEwMDIuNTc5IDQwMS43NDlIMTAzNS45NDdMMTA0MyA0NDguNzY4Mkg5MzIuMjc3NUw5MDIuNjI1MSA0MjIuOTgzNVoiIGZpbGw9IiNmM2VmZTciIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #100f0e 0%, #30221e 100%)",
          color: "#f3efe7",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, letterSpacing: 6, opacity: 0.75 }}>
          <span>TRAINING CLUB</span>
          <span>LEVALLOIS-PERRET</span>
        </div>
        <img src={LOGO} width={760} height={155} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 58, fontWeight: 700, lineHeight: 1.05 }}>
          <span>À TA FAÇON.</span>
          <span style={{ color: "#d29a72" }}>À FOND.</span>
        </div>
      </div>
    ),
    size,
  );
}
