import { useQuery } from "react-query";
import { axiosInstance } from "@/network";
import { IProduct } from "@dto/product.model.dto";

type useProductsProps = {
  page: number;
  orderBy?: string;
  sort: string;
  contentLength: number;
};

/**
 * @description 상품 리스트를 가져오는 hook
 */
export const useProducts = ({
  page,
  orderBy,
  sort,
  contentLength,
}: useProductsProps) => {
  return useQuery(
    ["products", page, orderBy, sort],
    async (): Promise<IProduct> => {
      const { data } = await axiosInstance(
        `/api/product/list?skip=${
          (page - 1) * contentLength
        }&take=${contentLength}${
          orderBy !== "none" ? `&sortList=[{"${orderBy}":"${sort}"}]` : ""
        }`
      );
      return data;
    },
    {
      onError: (error) => console.error(error),
      refetchOnWindowFocus: false,
    }
  );
};
