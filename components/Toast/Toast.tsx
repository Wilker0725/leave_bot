import { toast } from "react-toastify";

type PropsToast = {
  message: string;
  type?: "info" | "success" | "warning" | "error" | "default";
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  theme?: "colored" | "light" | "dark";
};

const Toast = ({
  type = "default",
  message,
  position = "top-right",
  theme = "light",
}: PropsToast) => {
  return toast(message, {
    type: type,
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

export default Toast;
