import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";

export interface UseCaseProps {
    addProductUseCase: UseCaseInterface;
    checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addProductUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCaseProps) {
        this._addProductUseCase = useCaseProps.addProductUseCase;
        this._checkStockUseCase = useCaseProps.checkStockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        //caso o dto do caso de uso for diferente do dtoo da facade, fazer a conversão aqui
        return this._addProductUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        //caso o dto do caso de uso for diferente do dtoo da facade, fazer a conversão aqui
        return this._checkStockUseCase.execute(input);
    }

}