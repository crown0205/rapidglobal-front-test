import { useEffect } from "react";

import { useBodyScrollLock } from "@/hook/useBodyScrollLock";
import useGlobalModalStore from "@/store/modal";

import ConfirmModal from "../ConfirmModal";
import AlertModal from "../AlertModal";

const MODAL_TYPES = {
  ConfirmModal: "ConfirmModal",
  AlertModal: "AlertModal",
} as const;

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.ConfirmModal]: ConfirmModal,
  [MODAL_TYPES.AlertModal]: AlertModal,
};

const GlobalModal: React.FC = () => {
  const {
    globalModal: { modalProps, modalType },
  } = useGlobalModalStore();
  const { lockScroll, openScroll } = useBodyScrollLock();

  useEffect(() => {
    if (document.body.style.overflow === "hidden") return;
    if (modalType) {
      lockScroll();
    } else {
      openScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalType]);

  const renderComponent = () => {
    if (!modalType) {
      return null;
    }
    const ModalComponent = MODAL_COMPONENTS[modalType];
    return <ModalComponent {...modalProps} />;
  };

  return <>{renderComponent()}</>;
};

export default GlobalModal;
