import AddProductUseCase from "./add-product.usecase";

describe("Add Product usecase unit test", () => {

    const MockRepository = () => {
        return {
            add: jest.fn(),
            find: jest.fn(),
        };
    };

    it("should add a product", async () => {
        const productRepository = MockRepository();
        const usecase = new AddProductUseCase(productRepository);
        
        const input = {
            name: "Product Name",
            description: "Product Description",
            price: 100,
            stock: 10
        };
        
        const output = await usecase.execute(input);

        expect(productRepository.add).toBeCalled()
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.price).toBe(input.price);
        expect(output.stock).toBe(input.stock);

    });

});