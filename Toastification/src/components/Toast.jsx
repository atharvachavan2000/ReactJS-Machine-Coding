import "./Toast.css";
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import { useRef, useEffect } from "react";

const iconStyles = { marginRight: "10px" };
const icons = {
  success: <AiOutlineCheckCircle style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles} />,
  warning: <AiOutlineWarning style={iconStyles} />,
  error: <AiOutlineCloseCircle style={iconStyles} />,
};

const animations = {
  fade: "fadeIn",
  pop: "popup",
  slide: "slideIn",
};

const Toast = ({
  severity = "success",
  message = "new toast",
  onClose = () => {},
  animation = "pop",
}) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      toastRef.current.focus();
    }
  }, []);

  let backgroundClass = `toast--${severity}`;

  const ariaRole =
    severity === "error" || severity === "warning" ? "alert" : "status";
  const ariaLive =
    severity === "error" || severity === "warning" ? "polite" : "assert";

  return (
    <div
      className={`toast ${backgroundClass} ${animations[animation]}`}
      role={ariaRole}
      aria-live={ariaLive}
      tabIndex={-1}
      ref={toastRef}
    >
      {icons[severity]}
      <span>{message}</span>
      <button onClick={() => onClose()} className="toast__close-btn">
        <AiOutlineClose color="white" role="button" />
      </button>
    </div>
  );
};

export default Toast;
