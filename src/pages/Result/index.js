import "./result.css";

import { Link, useParams } from "react-router-dom";

import { Timer } from "../../components/Timer";
import { useState } from "react";

export default function Result() {
  const p = useParams();
  const [complete, setComplete] = useState(false);

  return (
    <div className="center timer-box">
      {complete ? (
        <div>
          <div className="time-up-text">Time Up</div>
          <div>
            <Link to="/" style={{ color: "white", fontSize: "1rem" }}>
              Create a new Timer
            </Link>
          </div>
        </div>
      ) : (
        <Timer onComplete={() => setComplete(true)} target={+p.time} />
      )}
    </div>
  );
}
