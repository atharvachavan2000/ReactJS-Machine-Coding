import useToast from "./hooks/use-toast";
import "./styles.css";

export default function App() {
  const { ToastComponent, triggerToast } = useToast("top-right");

  return (
    <div className="container">
      <h4>Click on any of the buttons to trigger a toast!</h4>
      <div className="buttons">
        <button
          className="buttons__button"
          onClick={() =>
            triggerToast({
              severity: "success",
              message: "This is a success",
              animation: "fade",
            })
          }
        >
          Success
        </button>
        <button
          className="buttons__button"
          onClick={() =>
            triggerToast({
              severity: "error",
              message: "This is an Error",
              animation: "pop",
            })
          }
        >
          Error
        </button>
        <br />
        <button
          className="buttons__button"
          onClick={() =>
            triggerToast({
              severity: "warning",
              message: "This is a Warning",
              animation: "slide",
            })
          }
        >
          Warning
        </button>
        <button
          className="buttons__button"
          onClick={() =>
            triggerToast({
              severity: "info",
              message: "This is an Information",
            })
          }
        >
          Info
        </button>
      </div>
      {ToastComponent}
    </div>
  );
}
