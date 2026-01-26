export default function ChinaMap() {
  return (
    <svg viewBox="0 0 1000 700" width="100%" style={{ maxWidth: "100%" }}>
      <path d="PASTE_YOUR_BIG_PATH_HERE" fill="#d9d9d9" stroke="#999" strokeWidth="1" />

      <g className="map-pin">
        <circle cx="620" cy="200" r="8" fill="#000" />
        <text x="620" y="204" textAnchor="middle" fill="#fff" fontSize="12">
          +
        </text>
        <title>Beijing</title>
      </g>

      <g className="map-pin">
        <circle cx="650" cy="260" r="8" fill="#000" />
        <text x="650" y="264" textAnchor="middle" fill="#fff" fontSize="12">
          +
        </text>
        <title>Shanghai</title>
      </g>

      <g className="map-pin">
        <circle cx="700" cy="320" r="8" fill="#000" />
        <text x="700" y="324" textAnchor="middle" fill="#fff" fontSize="12">
          +
        </text>
        <title>Guangzhou</title>
      </g>
    </svg>
  );
}
