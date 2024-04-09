import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";

describe("ProductAdmFacade tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    // Esse trecho é substituído pela factory
    // const productRepository = new ProductRepository();
    // const addProductUseCase = new AddProductUseCase(productRepository);
    // const productFacade = new ProductAdmFacade({
    //     addProductUseCase: addProductUseCase,
    //     checkStockUseCase: undefined
    // });

    const productFacade = ProductAdmFacadeFactory.create();
    const productRepository = new ProductRepository();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const product = await productRepository.find("1");
    expect(product).toBeDefined();
    expect(product.id.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.price).toBe(input.price);
    expect(product.stock).toBe(input.stock);
  });

  it("should check product stock", async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const result = await productFacade.checkStock({ productId: "1" });
    expect(result).toBeDefined();
    expect(result.productId).toBe(input.id);
    expect(result.productName).toBe(input.name);
    expect(result.stock).toBe(input.stock);
  });
});
