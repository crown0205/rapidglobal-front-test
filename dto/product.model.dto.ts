export interface Product {
  id: number;
  title: string;
  uploadedAt: Date;
  price: number;
  viewCount: number;
  thumbnailUrls: string[];
}
