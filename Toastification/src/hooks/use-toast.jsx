import { useCallback, useState } from "react";
import Toast from "../components/Toast";

const useToast = (position = "top-right") => {
  const [toasts, setToasts] = useState([]);

  // User callBack will memoize the callback function provided, so
  // that a new function isn't created on every render.
  // This helps make the time logic consistent

  const triggerToast = useCallback((toastProps) => {
    const id = Date.now();
    const newToast = { id, ...toastProps };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((notif) => notif.id !== id));
    }, toastProps.duration || 3000);
  }, []);

  const handleToastClose = (index) => {
    setToasts((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  let ToastComponent = (
    <div className={`toast-container ${position}`}>
      {toasts.map((notif, index) => {
        return (
          <Toast
            {...notif}
            key={notif.id}
            onClose={() => handleToastClose(index)}
          />
        );
      })}
    </div>
  );

  return { ToastComponent, triggerToast, handleToastClose };
};

export default useToast;
