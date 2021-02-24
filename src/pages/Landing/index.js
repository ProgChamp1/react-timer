import "./landing.css";

import { Form } from "../../components/Form";
import { useHistory } from "react-router-dom";
import { useState } from "react";

/** Exported routes need to be default exports */
export default function Landing() {
  return <DateInput />;
}

function DateInput() {
  return (
    <div className="center">
      <div>
        <TimePicker />
        <div style={{ marginTop: "3rem", fontSize: "2rem" }}>OR</div>
        <DurationPicker />
      </div>
    </div>
  );
}

function TimePicker() {
  const hist = useHistory();
  const [value, setValue] = useState("");

  function handleInput(e) {
    const { currentTarget } = e;
    currentTarget && setValue(currentTarget.value);
  }

  return (
    <Form
      onSubmit={() => {
        if (!value) return;
        hist.push(`/t/${+new Date(value)}`);
      }}
    >
      <div>
        <div className="header">Enter Time</div>
        <input onInput={handleInput} type="datetime-local" value={value} />
      </div>
      <div>
        <button className="button">Go</button>
      </div>
    </Form>
  );
}
function DurationPicker() {
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const hist = useHistory();
  const minSecValue = !hours && !mins ? 1 : 0;

  const wrapperCss = { marginTop: "1rem" };
  const inputCss = { marginRight: "5px" };

  return (
    <Form
      onSubmit={() => {
        const secondsInMin = mins * 60;
        const secondsInHour = hours * 60 * 60;
        const totalSeconds = sec + secondsInMin + secondsInHour;
        const totalMs = totalSeconds * 1000;
        const timerTime = +new Date() + totalMs;
        hist.push(`/t/${timerTime}`);
      }}
    >
      <div className="header">Enter amount of time</div>
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <div style={wrapperCss}>
          <input
            type="number"
            style={inputCss}
            max="24"
            min="0"
            value={hours}
            onChange={getEventListener(setHours)}
          />
          Hours
        </div>
        <div style={wrapperCss}>
          <input
            type="number"
            style={inputCss}
            max="59"
            min="0"
            value={mins}
            onChange={getEventListener(setMins)}
          />
          Mins
        </div>
        <div style={wrapperCss}>
          <input
            type="number"
            style={inputCss}
            max="59"
            min={minSecValue}
            value={sec}
            onChange={getEventListener(setSec)}
          />
          Seconds
        </div>
      </div>
      <button className="button">Go</button>
    </Form>
  );
}
function getEventListener(cb) {
  return (e) => cb(+e.currentTarget.value);
}
