import {useState} from "react";
import {useEffect} from "react";
import {MIN, MAX} from "../constants/constants";

const Progressbar = ({value}) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent(Math.min(MAX, Math.max(value, MIN)));
  }, [value]);
  return (
    <div className="progressBar">
      <span
        className="progressValue"
        style={{color: `${percent > 49 ? "white" : "black"}`}}
      >
        {percent.toFixed()}%
      </span>
      <div
        role="progressbar"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        className="progressFill"
        style={{transform: `scaleX(${percent / MAX})`, transformOrigin: "left"}}
      ></div>
    </div>
  );
};

export default Progressbar;
