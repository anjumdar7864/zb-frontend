import { LightTooltip } from "@/components/common";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// export default function Dropdown({ targetRef, options, isOpen }) {
//   const [position, setPosition] = useState({ top: 0, left: 0 });

//   useEffect(() => {
//     if (isOpen && targetRef.current) {
//       const rect = targetRef.current.getBoundingClientRect();
//       setPosition({
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX - 100,
//       });
//     }
//   }, [isOpen, targetRef]);

//   if (!isOpen) return null;

//   return createPortal(
//     <div
//       style={{
//         position: "absolute",
//         top: `${position.top}px`,
//         left: `${position.left}px`,
//         background: "#fff",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//         borderRadius: "4px",
//         zIndex: 1000,
//         padding: "8px 0",
//         minWidth: "150px",
//       }}
//     >
//       {options.map((option, index) => (
//         <div
//           key={index}
//           style={{
//             padding: "8px 16px",
//             cursor: "pointer",
//             whiteSpace: "nowrap",
//           }}
//           onClick={() => option.onClick()}
//         >
//           {option.message ?
//             <LightTooltip
//               placement="top"
//               arrow
//               title={option?.message}
//             >
//               {option.label}

//             </LightTooltip>
//             :
//             option.label
//           }

//         </div>
//       ))}
//     </div>,
//     document.body
//   );
// }


export default function Dropdown({ targetRef, options, isOpen }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 100,
      });
    }
  }, [isOpen, targetRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        background: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        zIndex: 1000,
        padding: "8px 0",
        minWidth: "150px",
      }}
    >
      {options.map((option, index) => (
        <div
          key={index}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onClick={() => option.onClick()}
        >
          {option.message ? (
            <LightTooltip placement="top" arrow title={option?.message}>
              {option.label}
            </LightTooltip>
          ) : (
            option.label
          )}
        </div>
      ))}
    </div>,
    document.body
  );
}