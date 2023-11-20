import { useEffect, useState, useRef } from "react";
function Checkmark({ checked, className }) {
  const [length, setLength] = useState(null);
  const checkMarkRef = useRef(null);

  useEffect(() => {
    setLength(checkMarkRef.current.getTotalLength());
  }, []);

  return (
    <svg
      className={`w-[1.5em] h-[1.5em] p-1 border border-border rounded-sm ${
        checked ? "bg-green-500" : "bg-background"
      } hover:bg-accent ${className ? className : ""}`}
      viewBox="0 0 354 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={checkMarkRef}
        className="checkmark"
        strokeDasharray={length}
        strokeDashoffset={checked ? 0 : length}
        style={{ transition: "stroke-dashoffset 0.4s ease-in-out" }}
        id="checkmark"
        d="M7 147L138 246L346 7"
        stroke="black"
        strokeWidth="20"
      />
    </svg>
  );
}

export default Checkmark;
