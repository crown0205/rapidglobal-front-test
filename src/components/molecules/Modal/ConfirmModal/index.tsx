import useGlobalModalStore, { ModalType } from "@/store/modal";
import BaseModal from "../BaseModal";
import Button from "@/components/atoms/Button";

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
        <div className="w-full flex justify-around gap-8">
          <Button
            style="text-black border hover:bg-gray-100 active:bg-gray-200 transition-all flex-1"
            isClickEffect={false}
            onClick={onCancel ?? hideGlobalModal}
          >
            취소
          </Button>
          <Button
            style="text-black border hover:bg-gray-100 active:bg-gray-200 transition-all flex-1"
            isClickEffect={false}
            onClick={onConfirm}
          >
            확인
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
