import useGlobalModalStore from "@/store/modal";
import React from "react";
import ReactModal from "react-modal";

interface BaseModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  contentsStyle?: React.CSSProperties;
  handleClose?: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({
  children,
  isOpen,
  contentsStyle,
  handleClose,
}) => {
  const { hideGlobalModal } = useGlobalModalStore();

  const customStyles = {
    overlay: {
      background: "#00000040",
      zIndex: 9999,
    },
    content: {
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
      width: "100%",
      height: "fit-content",
      background: "white",
      padding: "16px",
      borderRadius: "16px",
      boxShadow: "0px 4px 32px rgba(53, 58, 63, 0.1)",
      ...contentsStyle,
    },
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose ?? hideGlobalModal}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
};

export default BaseModal;
