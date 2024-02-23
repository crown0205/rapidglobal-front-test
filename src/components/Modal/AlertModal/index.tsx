import useGlobalModalStore, { ModalType } from "@/store/modal";
import BaseModal from "../BaseModal";
import Button from "@/components/atoms/Button";

export interface AlertModalProps {
  text?: string;
  onConfirm?: () => void;
}

/** NOTE :  cancel 기본 동작은 모달을 닫는 것입니다. */
const AlertModal = ({ text = "text", onConfirm }: AlertModalProps) => {
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
          <Button
            size="small"
            isClickEffect={false}
            style="text-black border hover:bg-gray-100 active:bg-gray-200 transition-all"
            onClick={onConfirm ?? hideGlobalModal}
          >
            확인
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default AlertModal;
