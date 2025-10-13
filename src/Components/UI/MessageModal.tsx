import { useEffect, useRef, useState } from "react";
import type { UiMessage } from "@/types/ui-messages";

interface Props {
  message: UiMessage;
  onClose: (actionId?: string) => void;
}

export function MessageModal({ message, onClose }: Props) {
  const [visible, setVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let t: any;
    if (!message.actions?.length && message.autoCloseMs) {
      t = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose(), 180);
      }, message.autoCloseMs);
    }
    const handleClickOutside = (ev: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(ev.target as Node)) {
        if (!message.actions?.length) {
          clearTimeout(t);
          setVisible(false);
          setTimeout(() => onClose(), 140);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [message, onClose]);

  return (
    <div className={`fixed inset-0 z-[9999] grid place-items-center bg-black/30 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div
        ref={modalRef}
        className={`w-[min(92vw,460px)] rounded-2xl bg-white p-5 shadow-lg transition-all duration-200 ${visible ? "scale-100 translate-y-0" : "scale-95 -translate-y-1.5"}`}
      >
        {message.title && <h2 className="text-lg font-semibold mb-1">{message.title}</h2>}
        <p className="text-sm text-gray-700">{message.text}</p>

        {!!message.actions?.length && (
          <div className="mt-4 flex justify-end gap-2">
            {message.actions.map(a => (
              <button
                key={a.id}
                onClick={() => { setVisible(false); setTimeout(() => onClose(a.id), 140); }}
                className={`px-3 py-1.5 rounded ${a.primary ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
