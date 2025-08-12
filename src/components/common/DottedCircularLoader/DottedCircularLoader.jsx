import React, { useEffect } from "react";

const DottedCircularLoader = () => {
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet); // Cleanup on unmount
    };
  }, []);

  return (
    <div
      className="loading"
      style={{ fontSize: "80px", "--duration": "2s", "--num-dot": 10 }}
    >
      <div style={{ "--index": 0 }}></div>
      <div style={{ "--index": 1 }}></div>
      <div style={{ "--index": 2 }}></div>
      <div style={{ "--index": 3 }}></div>
      <div style={{ "--index": 4 }}></div>
      <div style={{ "--index": 5 }}></div>
      <div style={{ "--index": 6 }}></div>
      <div style={{ "--index": 7 }}></div>
      <div style={{ "--index": 8 }}></div>
      <div style={{ "--index": 9 }}></div>
    </div>
  );
};

const styles = `
.loading {
  font-size: 50px; /* Size of the loader */
  --duration: 2s; /* Duration of the animation */
  --num-dot: 10; /* Number of dots */
  --color-dot: #00BD82; /* Color of the dots */
  width: 1em; /* Aspect ratio control */
  aspect-ratio: 1; /* Maintain a square shape */
  position: relative;
}

.loading > * {
  position: absolute;
  width: 71px; /* Width of each dot */
  height: 74px; /* Height of each dot */
  top: 0;
  left: 0;
  transform: rotate(calc((360deg / var(--num-dot)) * var(--index)));
}

.loading > *::before {
  position: absolute;
  content: '';
  top: 0.25em; /* Adjust for vertical centering */
  left: 0.45em; /* Adjust for horizontal centering */
  width: 0.05em; /* Dot size */
  height: 0.05em; /* Dot size */
  border-radius: 50%; /* Keep the circular shape */
  background-color: var(--color-dot);
  animation: scaleTo1 var(--duration) ease-in-out calc(var(--duration) / var(--num-dot) * var(--index)) infinite reverse;
}

@keyframes scaleTo1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

/* Box style only */
.loading::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  border-radius: .2em;
}

/* Background style only */
// body {
//   width: 100vw;
//   height: 100vh;
//   margin: 0;
//   background-color: white;
//   display: grid;
//   place-items: center;
// }
// `;

export default DottedCircularLoader;
