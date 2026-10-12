import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  eyebrow?: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

// the screen overlay used by the booking form and the gig form
// children should be a <form> holding a .modal-body and a .modal-actions
export const Modal: React.FC<ModalProps> = ({
  eyebrow,
  title,
  onClose,
  children,
}) => {
  useEffect(() => {
    // Escape closes the overlay
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // stop the page behind the overlay from scrolling
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  // a portal puts the overlay straight under <body> so no parent can clip it
  return createPortal(
    <div
      className='overlay'
      // clicking the dark area (not the card) closes the overlay
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className='modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        <div className='modal-head'>
          <div>
            {eyebrow && <div className='special-label'>{eyebrow}</div>}
            <h3 id='modal-title' className='modal-title'>
              {title}
            </h3>
          </div>
          <button
            type='button'
            className='modal-close'
            aria-label='Close'
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};