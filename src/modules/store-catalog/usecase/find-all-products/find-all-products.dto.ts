export interface findAllProductsDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}
