import { AlertModalProps } from "@/components/molecules/Modal/AlertModal";
import { ConfirmModalProps } from "@/components/molecules/Modal/ConfirmModal";
import { create } from "zustand";

export type ModalType = "ConfirmModal" | "AlertModal" | null;

export interface GlobalModalType {
  modalType: ModalType;
  modalProps: ConfirmModalProps | AlertModalProps | null;
}

interface GlobalModalStore {
  globalModal: GlobalModalType;
  setGlobalModal: (modal: GlobalModalType) => void;
  hideGlobalModal: () => void;
}

const initialData = {
  globalModal: {
    modalType: null,
    modalProps: null,
  },
};

const useGlobalModalStore = create<GlobalModalStore>((set) => ({
  ...initialData,
  setGlobalModal: (modal) => set({ globalModal: modal }),
  hideGlobalModal: () =>
    set({
      globalModal: {
        modalProps: null,
        modalType: null,
      },
    }),
}));

export default useGlobalModalStore;
