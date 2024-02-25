import Button from "@/components/atoms/Button";
import { Product } from "@dto/product.model.dto";
import clsx from "clsx";
import React from "react";

interface EditTableTextProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  product: Product | null;
}

const EditTableText: React.FC<EditTableTextProps> = ({
  isEdit,
  setIsEdit,
  title,
  setTitle,
  product,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setTitle(product?.title ?? "");
  };

  return (
    <div className="flex items-end w-full">
      <div className="flex flex-col w-full">
        <p className="text-gray-500 text-label">상품명</p>
        <div className="flex w-full justify-between items-center">
          {isEdit ? (
            <input
              className="bg-white border border-gray-400 rounded-sm w-[100%] px-2 text-p"
              type="text"
              value={title}
              onChange={onChange}
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
              onClick={handleEdit}
            >
              수정
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTableText;
