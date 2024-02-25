import Button from "@/components/atoms/Button";
import { axiosInstance } from "@/network";
import useGlobalModalStore from "@/store/modal";
import { Product } from "@dto/product.model.dto";
import Close from "@icons/close.svg";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditTableText from "../../EditTableText";
import BaseModal from "../BaseModal";

interface ProductModalProps {
  isModalState: boolean;
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isModalState = false,
  product,
  onClose,
}) => {
  const { setGlobalModal, hideGlobalModal } = useGlobalModalStore();
  const [title, setTitle] = useState("");
  const [hoverImageUrl, setHoverImageUrl] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: productTitleEdit } = useMutation(
    "updateProduct",
    async ({ id, title }: { id: number; title: string }): Promise<boolean> => {
      const { data } = await axiosInstance.post("/api/product", {
        id,
        title,
      });
      const { success } = data;
      return success;
    },
    {
      onSuccess: (success) => {
        if (success) {
          queryClient.invalidateQueries("products");
          if (product) product.title = title;
          setIsEdit(false);

          setGlobalModal({
            modalProps: {
              text: "상품명이 변경되었습니다.",
            },
            modalType: "AlertModal",
          });
        }
      },

      onError: (error) => {
        console.log("edit error", error);
        setGlobalModal({
          modalProps: {
            text: "상품명 변경에 실패했습니다.",
          },
          modalType: "AlertModal",
        });
      },
    }
  );

  const handleCloseModal = () => {
    if (isEdit) {
      setGlobalModal({
        modalProps: {
          text: "수정중인 상품이 있습니다.\n저장하지 않고 나가시겠습니까?",
          onConfirm: () => {
            onClose();
            hideGlobalModal();
            setIsEdit(false);
          },
        },
        modalType: "ConfirmModal",
      });
    } else {
      setIsEdit(false);
      onClose();
    }
  };

  const handleSave = async () => {
    if (!product) return;
    if (!title) {
      return setGlobalModal({
        modalProps: {
          text: "상품명을 입력해주세요.",
        },
        modalType: "AlertModal",
      });
    }

    if (title === product?.title) {
      return setGlobalModal({
        modalProps: {
          text: "변경된 내용이 없습니다.",
        },
        modalType: "AlertModal",
      });
    }

    await productTitleEdit({ id: product?.id!, title });
  };

  const updatedAt = new Date(product?.uploadedAt ?? "").toLocaleDateString();

  const productInfo = [
    {
      title: "가격",
      value: product?.price.toLocaleString("kor") + "원",
    },
    {
      title: "등록 날짜",
      value: updatedAt,
    },
    {
      title: "조회수",
      value: product?.viewCount,
    },
  ];

  const modalContentsStyle: React.CSSProperties = {
    color: "black",
    width: "80%",
    maxWidth: "800px",
    minWidth: "500px",
    padding: "2rem",
  };

  return (
    <BaseModal
      isOpen={isModalState}
      contentsStyle={modalContentsStyle}
      handleClose={handleCloseModal}
    >
      <div className="flex justify-between">
        <h1 className="text-2xl px-2 text-modal-title">상품 상세</h1>
        <Close className="cursor-pointer " onClick={handleCloseModal} />
      </div>

      <div className="flex flex-col gap-[50px] pt-6">
        <div className="flex gap-10">
          <div>
            <Image
              src={product?.thumbnailUrls[0] ?? ""}
              alt="IMAGE"
              width={300}
              height={300}
              className="border-2 rounded-lg mb-4"
            />
            <div className="flex gap-2 w-full flex-wrap flex-row">
              {product?.thumbnailUrls.map((url, idx) => {
                return (
                  <Image
                    key={idx}
                    className="rounded-lg bg-slate-200 cursor-pointer border"
                    src={url}
                    alt="상품 이미지"
                    width={60}
                    height={60}
                    priority={true}
                    onMouseEnter={() => {
                      setHoverImageUrl(url);
                    }}
                    onMouseLeave={() => {
                      setHoverImageUrl("");
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-[60%]">
            <EditTableText
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              title={title}
              setTitle={setTitle}
              product={product}
            />
            {productInfo.map((info, idx) => {
              return (
                <div key={idx} className="flex flex-col">
                  <p className="text-gray-500 text-label">{info.title}</p>
                  <p className="text-p">{info.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {isEdit && (
          <div className="flex items-center justify-center gap-[16px]">
            <Button
              size="small"
              isClickEffect={false}
              style="border px-5 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all"
              onClick={() => {
                setIsEdit(false);
                setTitle("");
              }}
            >
              취소
            </Button>
            <Button
              size="small"
              isClickEffect={false}
              style="border px-5 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all"
              onClick={handleSave}
            >
              저장
            </Button>
          </div>
        )}
      </div>

      {hoverImageUrl && (
        <div className="bg-[#1d1d1d5b] shadow-[#00000011] shadow-md drop-shadow-lg p-5 absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[68%] w-[60%] h-[90%] flex justify-center items-center rounded-lg p-4 overflow-hidden">
          <Image
            className="w-full h-full"
            src={hoverImageUrl}
            alt={product?.title ?? "상품 이미지"}
            loading="eager"
            priority={true}
            fill
            sizes="100%"
            object-fit="cover"
          />
        </div>
      )}
    </BaseModal>
  );
};

export default ProductModal;
