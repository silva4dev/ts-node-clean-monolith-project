import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {
  FindAllStoreCatalogFacadeInputDto,
  FindAllStoreCatalogFacadeOutputDto,
} from "../../facade/store-catalog.facade.dto";
import ProductGateway from "../../gateway/product.gateway";
import {
  FindAllProductsInputDto,
  FindAllProductsOutputDto,
} from "./find-all-products.dto";

export default class FindAllProductsUsecase implements UseCaseInterface {
  private productGateway: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this.productGateway = productGateway;
  }

  async execute(
    input: FindAllProductsInputDto,
  ): Promise<FindAllProductsOutputDto> {
    const products = await this.productGateway.findAll();
    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        price: product.price,
      })),
    };
  }
}
