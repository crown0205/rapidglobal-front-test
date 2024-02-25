import { IOrderBy, Sort } from "@/pages";
import { IProduct, Product } from "@dto/product.model.dto";
import Down from "@icons/arrow-down.svg";
import Up from "@icons/arrow-up.svg";
import Image from "next/image";
import React from "react";

type IHeaderTitle = {
  title: string;
  order: IOrderBy;
  styles: string;
}[];

const headerTitle: IHeaderTitle = [
  {
    title: "",
    order: undefined,
    styles: "w-full max-w-[120px]",
  },
  {
    title: "상품명",
    order: "productTitle",
    styles: "w-full max-w-[320px]",
  },
  {
    title: "가격",
    order: "price",
    styles: "w-full max-w-[106px]",
  },
  {
    title: "등록 날짜",
    order: "uploadedAt",
    styles: "min-w-[70px] max-w-[100px] break-keep",
  },
  {
    title: "조회수",
    order: "viewCount",
    styles: "w-full max-w-[80px]",
  },
];

interface ProductTableProps {
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
  setOrderBy: React.Dispatch<React.SetStateAction<IOrderBy>>;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  setIsModalState: React.Dispatch<React.SetStateAction<boolean>>;
  sort: Sort;
  orderBy: IOrderBy;
  data?: IProduct;
  isLoading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
  setSort,
  setOrderBy,
  setProduct,
  setIsModalState,
  sort,
  orderBy,
  data,
  isLoading,
}) => {
  const handleSort = (newOrderBy: IOrderBy) => {
    if (orderBy !== newOrderBy) {
      setSort("desc");
      setOrderBy(newOrderBy);
    } else {
      setSort((prevSort) => {
        if (prevSort === "none") return "desc";
        if (prevSort === "desc") return "asc";
        return "none";
      });

      if (sort === "asc") {
        setOrderBy("none");
      }
    }
  };

  const handleProductClick = (product: Product) => {
    setIsModalState(true);
    setProduct(product);
  };

  return (
    <table className="w-[80%]">
      {/* 정렬을 위한 테이블 헤더와 onClick */}
      <thead className="flex w-full">
        <tr className="flex justify-between text-center w-full ">
          {headerTitle.map(({ title, order, styles }) => (
            <th
              key={title}
              className={`mb-8 cursor-pointer ${styles}`}
              onClick={() => {
                if (order !== undefined) handleSort(order);
              }}
            >
              <span className="relative text-table-header">
                {title}
                {orderBy === order && (
                  <span className="absolute top-0 left-12">
                    {sort === "desc" ? <Up /> : <Down />}
                  </span>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="flex flex-col overflow-y-auto h-[900px]">
        {isLoading ? (
          <tr className="flex justify-center items-center h-full text-2xl ">
            <td colSpan={5} className="text-center">
              로딩중입니다.
            </td>
          </tr>
        ) : (
          data?.productList.map((product: Product) => {
            const updatedAt = new Date(product.uploadedAt).toLocaleDateString();
            return (
              <tr
                key={product.id}
                className="text-center bg-slate-500 rounded-xl mb-2 cursor-pointer p-4 flex gap-4 items-center justify-between hover:bg-slate-600 transition-colors duration-300 ease-in-out"
                onClick={() => handleProductClick(product)}
              >
                <td className="">
                  <Image
                    className="rounded-2xl"
                    src={product.thumbnailUrls[0]}
                    alt={product.title}
                    width={100}
                    height={100}
                    priority={true}
                  />
                </td>
                <td className="w-[310px] break-keep text-table-body">
                  {product.title}
                </td>
                <td className="text-table-body">
                  {product.price.toLocaleString("kor")}원
                </td>
                <td className="text-table-body">{updatedAt}</td>
                <td className="min-w-[40px] text-table-body">
                  {product.viewCount}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
