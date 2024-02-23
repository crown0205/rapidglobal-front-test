import useGlobalModalStore, { ModalType } from "@/store/modal";
import BaseModal from "../BaseModal";

export interface ConfirmModalProps {
  text?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

/** NOTE :  cancel 기본 동작은 모달을 닫는 것입니다. */
const ConfirmModal = ({
  text = "text",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const { hideGlobalModal } = useGlobalModalStore();

  const contentsStyle = {
    maxWidth: "22.5rem",
  };

  return (
    <BaseModal isOpen contentsStyle={contentsStyle}>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="text-black text-xl mb-8 font-bold break-keep whitespace-pre-wrap">
          {text}
        </div>
        <div className="w-full flex justify-around">
          <button
            className="text-black border px-10 py-2 rounded-lg"
            onClick={onCancel ?? hideGlobalModal}
          >
            취소
          </button>
          <button
            className="text-black border px-10 py-2 rounded-lg"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
