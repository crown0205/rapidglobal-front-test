import Button from "@/components/atoms/Button";
import { axiosInstance } from "@/network";
import useGlobalModalStore from "@/store/modal";
import { Product } from "@dto/product.model.dto";
import Close from "@icons/close.svg";
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
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
  // NOTE : 수정 했는지 체크하기 위한 변수

  const updatedAt = new Date(product?.uploadedAt ?? "").toLocaleDateString();

  // TODO : DATE 따로 빼서 관리하기
  const productInfo = [
    {
      title: "상품명",
      value: title ?? product?.title,
    },
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

  const modalContentsStyle = {
    color: "black",
    width: "80%",
    maxWidth: "800px",
    minWidth: "500px",
    padding: "2rem",
  };

  const queryClient = useQueryClient();

  const { mutateAsync: productTitleEdit } = useMutation(
    "updateProduct",
    async ({ id, title }: { id: number; title: string }): Promise<boolean> => {
      // NOTE : 수정 요청
      const { data } = await axiosInstance.post("/api/product", {
        id,
        title,
      });
      const { success } = data;
      if (success) {
        queryClient.invalidateQueries("products");
      }
      return success;
    },
    {
      onError: (error) => {
        console.log("edit error", error);
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

    try {
      await productTitleEdit({ id: product?.id!, title }).then((result) => {
        if (!result) {
          return setGlobalModal({
            modalProps: {
              text: "상품명 변경에 실패했습니다.",
            },
            modalType: "AlertModal",
          });
        }

        setIsEdit(false);
        product.title = title;
        setGlobalModal({
          modalProps: {
            text: "상품명이 변경되었습니다.",
          },
          modalType: "AlertModal",
        });
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <BaseModal
      isOpen={isModalState}
      contentsStyle={modalContentsStyle}
      handleClose={handleCloseModal}
    >
      {/* NOTE : title 영역 */}
      <div className="flex justify-between">
        <h1 className="text-2xl px-2 text-modal-title">상품 상세</h1>
        <Close className="cursor-pointer " onClick={handleCloseModal} />
      </div>

      {/* NOTE : 컨텐츠 영역 */}
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
            {/* NOTE : 이미지 리스트  */}
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
                      // NOTE : 이미지 호버시 크게 보기
                      setHoverImageUrl(url);
                    }}
                    onMouseLeave={() => {
                      // NOTE : 이미지 호버 해제시 크게 보기 해제
                      setHoverImageUrl("");
                    }}
                  />
                );
              })}
            </div>
          </div>
          {/* NOTE : 정보 영역 */}
          <div className="flex flex-col gap-3 w-full max-w-[60%]">
            <div className="flex items-end w-full">
              <div className="flex flex-col w-full">
                <p className="text-gray-500 text-label">상품명</p>
                <div className="flex w-full justify-between items-center">
                  {isEdit ? (
                    <input
                      className="bg-white border border-gray-400 rounded-sm w-[100%] px-2 text-p"
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  ) : (
                    <p className="break-keep text-p">{product?.title}</p>
                  )}
                  {!isEdit && (
                    <Button
                      size="small"
                      isClickEffect={false}
                      style={clsx(
                        "px-2 py-1 ml-2 border rounded-md min-w-[60px]",
                        "hover:bg-gray-100 active:bg-gray-200 transition-all"
                      )}
                      onClick={() => {
                        setIsEdit(true);
                        setTitle(product?.title ?? "");
                      }}
                    >
                      수정
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 text-label">가격</p>
              <p className="text-p">{product?.price.toLocaleString("kor")}원</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 text-label">등록 날짜</p>
              <p className="text-p">{updatedAt}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-500 text-label">조회수</p>
              <p className="text-p">{product?.viewCount}</p>
            </div>
          </div>
        </div>
        {/* NOTE : 저장, 취소 버튼 */}
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

      {/* NOTE : IMAGE 호버시 나올 IMAGE MODAL */}
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
