import * as React from "react";

const Polygon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 178 161"
    {...props}
  >
    <path
      d="M66.8 54.7 50.1 45 0 74.1v58l50.1 29 50.1-29V41.9L128 25.8l27.8 16.1v32.2L128 90.2l-16.7-9.7v25.8L128 116l50.1-29V29L128 0 77.9 29v90.2l-27.8 16.1-27.8-16.1V86.9l27.8-16.1 16.7 9.7V54.7z"
      style={{
        fill: "#6c00f6",
      }}
    />
  </svg>
);
export default Polygon;
