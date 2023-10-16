import { useEffect, useState, useRef } from "react";
import "./checkmark.css";
function Checkmark({ checked, className }) {
  const [length, setLength] = useState(null);
  const checkMarkRef = useRef(null);

  useEffect(() => {
    setLength(checkMarkRef.current.getTotalLength());
  }, []);

  return (
    <svg
      className={`w-[2em] h-[2em] p-2 ${className ? className : ""}`}
      viewBox="0 0 354 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={checkMarkRef}
        className="checkmark"
        strokeDasharray={length}
        strokeDashoffset={checked ? 0 : length}
        id="checkmark"
        d="M7 147L138 246L346 7"
        stroke="black"
        strokeWidth="20"
      />
    </svg>
  );
}

export default Checkmark;
