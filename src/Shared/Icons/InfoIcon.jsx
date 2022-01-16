import React from "react";

function InfoIcon() {
  return (
    <svg
      aria-haspopup="true"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-info-circle"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      opacity="1"
      strokeWidth="2.0"
      stroke="#A0AEC0"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <circle cx={12} cy={12} r={9} />
      <line x1={12} y1={8} x2="12.01" y2={8} />
      <polyline points="11 12 12 12 12 16 13 16" />
    </svg>
  );
}

export default InfoIcon;
