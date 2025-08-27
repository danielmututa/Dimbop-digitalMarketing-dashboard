import { useState, createContext, useContext, ReactNode } from "react";

type ToastType = "success" | "error";

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<ToastType>("success");

  const toast = (msg: string, t: ToastType = "success") => {
    setMessage(msg);
    setType(t);
    setTimeout(() => setMessage(null), 3000); // Auto-hide after 3s
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {message && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow text-white ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
