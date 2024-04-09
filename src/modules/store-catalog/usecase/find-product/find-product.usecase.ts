import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
    
        private productGateway: ProductGateway;
    
        constructor(productGateway: ProductGateway) {
            this.productGateway = productGateway;
        }
    
        async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
            const product = await this.productGateway.find(input.id);
            return {
                id: product.id.id,
                name: product.name,
                description: product.description,
                price: product.price,
            };
        }
}