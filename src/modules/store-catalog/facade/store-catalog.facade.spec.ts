import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe("StoreCatalg unit tests", () => {
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

  it("should find a product", async () => {
    const facade = StoreCatalogFacadeFactory.create();

    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Desc 1",
      stock: 1,
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await facade.find({ id: "1" });
    expect(result.id).toBe("1");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Desc 1");
    expect(result.price).toBe(100);
  });

  it("should find all products", async () => {
    const facade = StoreCatalogFacadeFactory.create();

    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Desc 1",
      stock: 1,
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Desc 2",
      stock: 1,
      price: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await facade.findAll({});
    expect(result.products[0].id).toBe("1");
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[0].description).toBe("Desc 1");
    expect(result.products[0].price).toBe(100);

    expect(result.products[1].id).toBe("2");
    expect(result.products[1].name).toBe("Product 2");
    expect(result.products[1].description).toBe("Desc 2");
    expect(result.products[1].price).toBe(200);
  });
});
