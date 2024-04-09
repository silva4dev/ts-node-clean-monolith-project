import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  FindAllStoreCatalogFacadeInputDto,
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.dto";
import StoreCatalogFacadeInterface from "./store-catalog.facade.interface";

export interface UseCaseProp {
  findProductUseCase: UseCaseInterface;
  findAllProductsUseCase: UseCaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findProductUseCase: UseCaseInterface;
  private _findAllproductsUseCase: UseCaseInterface;

  constructor(useCaseProp: UseCaseProp) {
    this._findProductUseCase = useCaseProp.findProductUseCase;
    this._findAllproductsUseCase = useCaseProp.findAllProductsUseCase;
  }

  find(
    input: FindStoreCatalogFacadeInputDto,
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    return this._findProductUseCase.execute(input);
  }

  findAll(
    input: FindAllStoreCatalogFacadeInputDto,
  ): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this._findAllproductsUseCase.execute(input);
  }
}
