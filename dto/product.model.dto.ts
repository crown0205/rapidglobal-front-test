export type Product = {
  id: number;
  title: string;
  uploadedAt: Date;
  price: number;
  viewCount: number;
  thumbnailUrls: string[];
};

export interface IProduct {
  productList: Product[];
  totalCount: number;
}
