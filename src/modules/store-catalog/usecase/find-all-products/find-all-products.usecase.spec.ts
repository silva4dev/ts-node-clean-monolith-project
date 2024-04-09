import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description 1",
    price: 100
});

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Description 2",
    price: 200
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    }
}

describe("Find all products usecase unit test", () => {
    it("should return all products", async () => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductsUsecase(productRepository);
        const result = await usecase.execute({});

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products).toHaveLength(2);

        expect(result.products[0].id).toEqual(product.id.id);
        expect(result.products[0].name).toEqual(product.name);
        expect(result.products[0].description).toEqual(product.description);
        expect(result.products[0].price).toEqual(product.price);
        
        expect(result.products[1].id).toEqual(product2.id.id);
        expect(result.products[1].name).toEqual(product2.name);
        expect(result.products[1].description).toEqual(product2.description);
        expect(result.products[1].price).toEqual(product2.price);

    });
});