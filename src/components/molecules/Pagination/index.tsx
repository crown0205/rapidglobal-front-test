import Button from "@/components/atoms/Button";
import { IProduct } from "@dto/product.model.dto";
import clsx from "clsx";
import React from "react";

interface PaginationProps {
  productListData?: IProduct;
  contentLength: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  productListData,
  contentLength,
  page,
  setPage,
}) => {
  return (
    <div className="flex gap-2 justify-end w-[100%] max-w-[90%] min-w-[50%]">
      {productListData ? (
        Array.from({
          length: Math.ceil(productListData.totalCount / contentLength),
        }).map((_, index) => {
          return (
            <Button
              key={index}
              size="small"
              style={clsx(
                "bg-slate-500 text-white",
                index + 1 === page && "bg-slate-700",
                index + 1 !== page && "hover:bg-slate-600"
              )}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Button>
          );
        })
      ) : (
        <Button
          style={clsx("bg-slate-500 text-white", {
            "bg-slate-300": 1 === page,
          })}
        >
          {page}
        </Button>
      )}
    </div>
  );
};

export default Pagination;
