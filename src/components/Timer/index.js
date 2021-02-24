import "./timer.css";

import { useEffect, useRef, useState } from "react";

import { useInterval } from "../../customHooks";

function tFix(t) {
  t = "" + t;
  return (t.length === 1 ? "0" : "") + t; 
}

const getTimeLeft = (n) => n - (+new Date());

function parseTime(timeLeft) {
  let _left;
  const inSeconds = timeLeft / 1000;

  const secInAnHour = 3600;
  const minInHour = 60;
  const secInAMin = 60;
  

  const hours = Math.floor(inSeconds / secInAnHour);
  _left = inSeconds % secInAnHour;

  const mins = Math.floor(_left / minInHour);

  _left = Math.round(_left % secInAMin);

  const sec = _left;

  if (inSeconds > 3.5) {
    return `${tFix(hours)}:${tFix(mins)}:${tFix(sec)}`;
  }
  return sec
}

export function Timer({ target, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));
  const isTiming = timeLeft > 500;
  const [pause, setPause] = useState(false);
  const completeCalled = useRef(false);

  useEffect(() => {
    const t = getTimeLeft(target);
    setTimeLeft(t);
  }, [target]);

  function updateTime() {
    if (!isTiming || pause) return;
    const n = timeLeft - 1000;
    setTimeLeft(n);
  }

  useInterval(updateTime, isTiming ? 1000 : null);

  useEffect(
    () =>
      !isTiming &&
      !completeCalled.current &&
      (completeCalled.current = true) &&
      onComplete(),
    [isTiming, onComplete]
  );

  return isTiming ? (
    <div>
      <div>
        <div style={window.innerWidth > 550 ? { fontSize: "6.5rem" } : null}>
          {parseTime(timeLeft)}
        </div>
      </div>
      <div className="button-container">
        <span onClick={() => setPause(!pause)} style={{ cursor: "pointer" }}>
          {!pause ? <Pause /> : <Play />}
        </span>
      </div>
    </div>
  ) : null;
}

function Pause() {
  return (
    <svg
      height="4rem"
      width="4rem"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function Play() {
  return (
    <svg
      height="4rem"
      width="4rem"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
