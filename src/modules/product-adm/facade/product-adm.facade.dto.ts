export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}
export interface CheckStockFacadeInputDto {
  productId: string;
}

export interface CheckStockFacadeOutputDto {
  productId: string;
  productName: string;
  stock: number;
}
