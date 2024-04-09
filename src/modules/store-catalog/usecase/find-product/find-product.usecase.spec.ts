import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: 'Product 1',
    description: 'Description 1',
    price: 10,
});

const mockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockResolvedValue(Promise.resolve(product)),
    };
};

describe('FindProductUseCase test', () => {
    it('should find a product', async () => {
        const repository =  mockRepository();
        const useCase = new FindProductUseCase(repository);

        const input = {
            id: product.id.id,
        } 

        const result = await useCase.execute(input);
        expect(repository.find).toHaveBeenCalledWith(input.id)
        expect(result.id).toBe(product.id.id);
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
    });
});
