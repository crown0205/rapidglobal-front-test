import React from "react";
import ReactModal from "react-modal";

interface BaseModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  handleClose?: () => void;
  disableModalPadding?: boolean;
  disableModalInnerGap?: boolean;
  contentsStyle?: React.CSSProperties;
}

const BaseModal: React.FC<BaseModalProps> = ({
  children,
  isOpen,
  contentsStyle,
  handleClose,
}) => {
  const customStyles = {
    overlay: {
      background: "#00000040",
      zIndex: 9999,
    },
    content: contentsStyle,
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
};

export default BaseModal;
