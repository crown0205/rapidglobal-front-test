import { Product } from "@dto/product.model.dto";
import dayjs from "dayjs";
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

//http://localhost:3000/api/product/list?skip=0&take=10&sortList=[{%22price%22:%22desc%22}]

export default function GET(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const {
    skip: skipQuery = "0",
    take: takeQuery = "10",
    sortList: sortListStr = "[]",
  } = req.query;

  const skip = Number(skipQuery);
  const take = Number(takeQuery);

  const data = readFileSync("data.json", "utf-8");

  const productList: Product[] = JSON.parse(data);
  const querySortList = JSON.parse(sortListStr as string);

  const sortFunc: Record<string, Function> = {
    price: sortByPrice,
    productTitle: sortByTitle,
    uploadedAt: sortByUploadedAt,
    viewCount: sortByViewCount,
  };

  const sortList = querySortList.map((sort: Record<string, string>) => {
    const sortObj = Object.entries<string>(sort)[0];
    const func = sortFunc[sortObj[0]];
    return {
      func,
      orderBy: sortObj[1],
    };
  });

  const sortProductList = productList
    .toSorted((a, b) => {
      for (const sort of sortList) {
        const sortFuncResult = sort.func(a, b, sort.orderBy);
        if (sortFuncResult !== 0) {
          if (sort.orderBy === "asc") {
            return sortFuncResult * -1;
          }
          return sortFuncResult;
        }
      }
    })
    .slice(skip, skip + take);

  res.status(200).json(sortProductList);
}

function sortByPrice(a: Product, b: Product) {
  return b.price - a.price;
}

function sortByTitle(a: Product, b: Product) {
  return b.title.localeCompare(a.title);
}

function sortByUploadedAt(a: Product, b: Product) {
  return dayjs(b.uploadedAt).diff(dayjs(a.uploadedAt), "days");
}
function sortByViewCount(a: Product, b: Product) {
  return b.viewCount - a.viewCount;
}
