"use client";

type Props = {
  data: number[];
  width?: number;
  height?: number;
  positive?: boolean;
};

export function Sparkline({ data, width = 64, height = 24, positive }: Props) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });

  const color = positive === false
    ? "#ef4444"
    : positive === true
    ? "#22c55e"
    : data[data.length - 1] >= data[0]
    ? "#22c55e"
    : "#ef4444";

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </svg>
  );
}
