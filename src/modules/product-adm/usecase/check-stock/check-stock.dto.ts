export interface CheckStockInputDto {
  productId: string;
}

export interface CheckStockOutputDto {
  productId: string;
  productName: string;
  stock: number;
}
