import React from "react";

function SmallTriangle() {
  return (
    <svg
      className="absolute bottom-0 -mb-2"
      width="16px"
      height="8px"
      viewBox="0 0 16 8"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Tooltips-"
          transform="translate(-84.000000, -203.000000)"
          fill="#FFFFFF"
        >
          <g id="Group-3-Copy" transform="translate(76.000000, 145.000000)">
            <polygon
              className="shadow"
              id="Triangle"
              transform="translate(16.000000, 62.000000) rotate(-180.000000) translate(-16.000000, -62.000000) "
              points="16 58 24 66 8 66"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SmallTriangle;
