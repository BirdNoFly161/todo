import { useState, useRef, useEffect } from "react";

function Task1({ toggle, delay }) {
  const [checkmarkLength, setCheckmarkLength] = useState(null);
  const [toggleAnimation, setToggle] = useState(toggle);

  const checkMarkRef = useRef(null);
  //const taskNameRef = useRef(null);

  useEffect(() => {
    setCheckmarkLength(checkMarkRef.current.getTotalLength());
    //setTaskNameLength(taskNameRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => setToggle(!toggleAnimation), delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <g id="task1">
        <rect
          id="checkmarkBorder1"
          x="21.5"
          y="32.5"
          width="9"
          height="8"
          rx="1.5"
          fill="white"
          stroke="black"
        />
        <rect
          id="taskName1"
          x="37"
          y="34"
          width="41"
          height="5"
          fill="#D9D9D9"
          style={{ transition: "stroke-dashoffset 0.4s ease-in-out" }}
        />
        <path
          id="checkmark1"
          ref={checkMarkRef}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={toggleAnimation ? 0 : checkmarkLength}
          d="M23.5 36L25 37.5L28.5 34.5"
          stroke="black"
          style={{
            opacity: toggleAnimation ? 1 : 0,
            transition: "stroke-dashoffset 0.4s ease-in-out",
          }}
        />
      </g>
      <defs>
        <linearGradient
          id="linear_gradient_black_white1"
          x1="37"
          y1="34"
          x2="78"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop id="firststop1" offset="0.5" stopColor="#B3A492" />
          <stop id="secondstop1" offset="1" stopColor="#6C5F5B" />
        </linearGradient>
      </defs>

      <style>
        {`
        #taskName1{
          fill: url(#linear_gradient_black_white1)
        }

        #firststop1{
          animation: fill-gradient1 3s ease forwards infinite; 
        }

        #secondstop1{
          animation: fill-gradient2 3s ease forwards infinite; 
        }

        @keyframes fill-gradient1 {
          0% {
            stop-color: #B3A492;
          }
          50% {
            stop-color: #6C5F5B
          }
          100%{
            stop-color: #B3A492;
          }
        }

        @keyframes fill-gradient2 {
          0% {
            stop-color: #6C5F5B;
          }
          50% {
            stop-color: #B3A492;
          }
          100%{
            stop-color: #6C5F5B;
          }
        }
      `}
      </style>
    </>
  );
}

function Task2({ toggle, delay }) {
  const [checkmarkLength, setCheckmarkLength] = useState(null);
  const [toggleAnimation, setToggle] = useState(toggle);

  const checkMarkRef = useRef(null);
  //const taskNameRef = useRef(null);

  useEffect(() => {
    setCheckmarkLength(checkMarkRef.current.getTotalLength());
    //setTaskNameLength(taskNameRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => setToggle(!toggleAnimation), delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <g id="task2">
        <rect
          id="checkmarkBorder2"
          x="21.5"
          y="49.5"
          width="9"
          height="8"
          rx="1.5"
          fill="white"
          stroke="black"
        />
        <rect
          id="taskName2"
          x="37"
          y="51"
          width="41"
          height="5"
          fill="#D9D9D9"
        />
        <path
          id="checkmark2"
          ref={checkMarkRef}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={toggleAnimation ? 0 : checkmarkLength}
          d="M23.5 53L25 54.5L28.5 51.5"
          stroke="black"
          style={{
            opacity: toggleAnimation ? 1 : 0,
            transition: "stroke-dashoffset 0.4s ease-in-out",
          }}
        />
      </g>
      <defs>
        <linearGradient
          id="linear_gradient_black_white2"
          x1="37"
          y1="34"
          x2="78"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop id="firststop2" offset="0.5" stopColor="#ED7D31" />
          <stop id="secondstop2" offset="1" stopColor="#6C5F5B" />
        </linearGradient>
      </defs>

      <style>
        {`
        #taskName2{
          fill: url(#linear_gradient_black_white2)
        }

        #firststop2{
          animation: fill-gradient1 3s ease forwards infinite; 
        }

        #secondstop2{
          animation: fill-gradient2 3s ease forwards infinite; 
        }

        @keyframes fill-gradient1 {
          0% {
            stop-color: #ED7D31;
          }
          50% {
            stop-color: #6C5F5B
          }
          100%{
            stop-color: #ED7D31;
          }
        }

        @keyframes fill-gradient2 {
          0% {
            stop-color: #6C5F5B;
          }
          50% {
            stop-color: #ED7D31
          }
          100%{
            stop-color: #6C5F5B;
          }
        }
      `}
      </style>
    </>
  );
}

function Task3({ toggle, delay }) {
  const [checkmarkLength, setCheckmarkLength] = useState(null);
  const [toggleAnimation, setToggle] = useState(toggle);

  const checkMarkRef = useRef(null);
  //const taskNameRef = useRef(null);

  useEffect(() => {
    setCheckmarkLength(checkMarkRef.current.getTotalLength());
    //setTaskNameLength(taskNameRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => setToggle(!toggleAnimation), delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <g id="task3">
        <rect
          id="checkmarkBorder3"
          x="21.5"
          y="66.5"
          width="9"
          height="8"
          rx="1.5"
          fill="white"
          stroke="black"
        />
        <rect
          id="taskName3"
          x="37"
          y="68"
          width="41"
          height="5"
          fill="#D9D9D9"
        />
        <path
          id="checkmark3"
          ref={checkMarkRef}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={toggleAnimation ? 0 : checkmarkLength}
          d="M23.5 70L25 71.5L28.5 68.5"
          stroke="black"
          style={{
            opacity: toggleAnimation ? 1 : 0,
            transition: "stroke-dashoffset 0.4s ease-in-out",
          }}
        />
      </g>
      <defs>
        <linearGradient
          id="linear_gradient_black_white3"
          x1="37"
          y1="34"
          x2="78"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop id="firststop3" offset="0.5" stopColor="#ED7D31" />
          <stop id="secondstop3" offset="1" stopColor="#6C5F5B" />
        </linearGradient>
      </defs>

      <style>
        {`
        #taskName3{
          fill: url(#linear_gradient_black_white3)
        }

        #firststop3{
          animation: fill-gradient1 3s ease forwards infinite; 
        }

        #secondstop3{
          animation: fill-gradient2 3s ease forwards infinite; 
        }

        @keyframes fill-gradient1 {
          0% {
            stop-color: #ED7D31;
          }
          50% {
            stop-color: #6C5F5B
          }
          100%{
            stop-color: #ED7D31;
          }
        }

        @keyframes fill-gradient2 {
          0% {
            stop-color: #6C5F5B;
          }
          50% {
            stop-color: #ED7D31
          }
          100%{
            stop-color: #6C5F5B;
          }
        }
      `}
      </style>
    </>
  );
}

function Task4({ toggle, delay }) {
  const [checkmarkLength, setCheckmarkLength] = useState(null);
  const [toggleAnimation, setToggle] = useState(toggle);

  const checkMarkRef = useRef(null);
  //const taskNameRef = useRef(null);

  useEffect(() => {
    setCheckmarkLength(checkMarkRef.current.getTotalLength());
    //setTaskNameLength(taskNameRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => setToggle(!toggleAnimation), delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <g id="task4">
        <rect
          id="checkmarkBorder4"
          x="21.5"
          y="83.5"
          width="9"
          height="8"
          rx="1.5"
          fill="white"
          stroke="black"
        />
        <rect
          id="taskName4"
          x="37"
          y="85"
          width="41"
          height="5"
          fill="#D9D9D9"
        />
        <path
          id="checkmark4"
          ref={checkMarkRef}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={toggleAnimation ? 0 : checkmarkLength}
          d="M23.5 87L25 88.5L28.5 85.5"
          stroke="black"
          style={{
            opacity: toggleAnimation ? 1 : 0,
            transition: "stroke-dashoffset 0.4s ease-in-out",
          }}
        />
      </g>
      <defs>
        <linearGradient
          id="linear_gradient_black_white4"
          x1="37"
          y1="34"
          x2="78"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop id="firststop4" offset="0.5" stopColor="#ED7D31" />
          <stop id="secondstop4" offset="1" stopColor="#6C5F5B" />
        </linearGradient>
      </defs>

      <style>
        {`
        #taskName4{
          fill: url(#linear_gradient_black_white3)
        }

        #firststop4{
          animation: fill-gradient1 3s ease forwards infinite; 
        }

        #secondstop4{
          animation: fill-gradient2 3s ease forwards infinite; 
        }

        @keyframes fill-gradient1 {
          0% {
            stop-color: #ED7D31;
          }
          50% {
            stop-color: #6C5F5B
          }
          100%{
            stop-color: #ED7D31;
          }
        }

        @keyframes fill-gradient2 {
          0% {
            stop-color: #6C5F5B;
          }
          50% {
            stop-color: #ED7D31
          }
          100%{
            stop-color: #6C5F5B;
          }
        }
      `}
      </style>
    </>
  );
}

function Noteboard() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="125" fill="#F5F5F5" />
      <rect id="woodenBG" width="100" height="125" rx="10" fill="#FFC95F" />
      <rect id="paper" x="12" y="16" width="75" height="95" fill="white" />
      <g id="clipper">
        <rect id="clip" x="28" y="8" width="44" height="16" fill="#B6B0B0" />
        <circle id="outerCircle" cx="50" cy="8" r="4" fill="#B6B0B0" />
        <circle id="innerCircle" cx="50" cy="8" r="2" fill="#FFC95F" />
      </g>

      <Task1 toggle={false} delay={300} />
      <Task2 toggle={false} delay={500} />
      <Task3 toggle={false} delay={700} />
      <Task4 toggle={false} delay={900} />
    </svg>
  );
}

export default Noteboard;
