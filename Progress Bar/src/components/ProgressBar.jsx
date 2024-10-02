import { useState, useEffect } from "react";

// TODO: Add onComplete function
const ProgressBar = ({ percentage = 0 }) => {
  const [value, setValue] = useState(percentage);

  useEffect(() => {
    setValue(Math.min(100, Math.max(percentage, 0)));
  }, [percentage]);

  let textColorClass = percentage < 50 ? "" : "white-text";

  return (
    <div className="progress-bar">
      {percentage !== 0 && (
        <div className="filled" style={{ width: `${value}%` }}></div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className={textColorClass + " text"}
      >
        {value.toFixed()}%
      </div>
    </div>
  );
};

export default ProgressBar;
