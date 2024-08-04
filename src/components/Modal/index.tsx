import React, { useEffect, useRef } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  backdropOpacity?: number;
  children: React.ReactNode;
  showCloseButton?: boolean;
  onBackdropClick?: () => void;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

/**
 * Modal component that displays a dialog box on top of the current page.
 *
 * @param {boolean} isOpen - Controls whether the modal is visible or not.
 * @param {() => void} onClose - Function to call when the modal should be closed.
 * @param {string} [title] - Optional title to display at the top of the modal.
 * @param {'small' | 'medium' | 'large'} [size='medium'] - Size of the modal.
 * @param {number} [backdropOpacity=0.5] - Opacity of the backdrop.
 * @param {React.ReactNode} children - The content to display inside the modal.
 * @param {boolean} [showCloseButton=true] - Whether to show a close button.
 * @param {() => void} [onBackdropClick] - Function to call when the backdrop is clicked.
 * @param {string} [aria-labelledby] - ID of the element that labels the modal.
 * @param {string} [aria-describedby] - ID of the element that describes the modal.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'medium',
  backdropOpacity = 0.5,
  children,
  showCloseButton = true,
  onBackdropClick,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Lock scrolling on the background when modal is open
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      // Set focus on the modal for keyboard accessibility
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    // Ensure the click is on the backdrop and not on the modal itself
    if (event.target === event.currentTarget) {
      if (onBackdropClick) {
        onBackdropClick();
      } else {
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      style={{ backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})` }}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={`modal modal-${size}`}
        role="dialog"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        tabIndex={-1}
        ref={modalRef}
      >
        {showCloseButton && (
          <div className="modal-btn-close">
            <button className="modal-close-button" onClick={onClose}>
              &times;
            </button>
          </div>
        )}
        {title && (
          <div className="modal-header">
            <h2 id={ariaLabelledby}>{title}</h2>
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
