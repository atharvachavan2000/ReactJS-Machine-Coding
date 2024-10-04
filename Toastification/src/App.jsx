import "./styles.css";
import ProgressBar from "./components/ProgressBar";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [percentage, setPercentage] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPercentage((val) => val + 1);
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (percentage > 100) {
      clearInterval(intervalRef.current);
    }
  }, [percentage]);

  return (
    <div className="App">
      <h3>Progress Bar </h3>
      <ProgressBar percentage={percentage} />
    </div>
  );
}
