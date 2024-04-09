import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product Name",
  description: "Product Description",
  price: 100,
  stock: 10,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockResolvedValue(Promise.resolve(product)),
  };
};

describe("Add Product usecase unit test", () => {
  it("should check a stock product", async () => {
    const productRepository = MockRepository();
    const usecaseStock = new CheckStockUseCase(productRepository);
    const inputStock = {
      productId: "1",
    };

    const output = await usecaseStock.execute(inputStock);

    expect(productRepository.find).toBeCalledWith(
      new Id(inputStock.productId).id,
    );
    expect(productRepository.find).toHaveBeenCalled();
    expect(output.productId).toBe(product.id.id);
    expect(output.productName).toBe(product.name);
    expect(output.stock).toBe(product.stock);
  });
});
