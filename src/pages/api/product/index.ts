import { Product } from "@dto/product.model.dto";
import { readFileSync, writeFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

export default function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id, title } = req.body;

  const dataStr = readFileSync("data.json", "utf-8");
  const dataList: Product[] = JSON.parse(dataStr);

  const product = dataList.find((product) => product.id === id);
  if (!product) {
    res.status(404).json({
      success: false,
    });
    return;
  }
  product.title = title;
  writeFileSync("data.json", JSON.stringify(dataList));

  res.status(200).json({
    success: true,
  });
}
