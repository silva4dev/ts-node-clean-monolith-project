import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice/invoice.model";
import ProductModel from "../repository/product/product.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      id: "1",
      name: "Invoice 1",
      document: "123",
      street: "street",
      number: "123",
      complement: "14",
      city: "Sao Paulo",
      state: "SP",
      zipCode: "12345678",
      items: [
        { id: "1", name: "Product 1", price: 100.0 },
        { id: "2", name: "Product 2", price: 200.0 },
      ],
    };

    const output = await facade.create(input);

    expect(output).toBeDefined();
    expect(output.id).toBeDefined();
    expect(output.name).toEqual(input.name);
    expect(output.document).toEqual(input.document);
    expect(output.street).toEqual(input.street);
    expect(output.number).toEqual(input.number);
    expect(output.complement).toEqual(input.complement);
    expect(output.city).toEqual(input.city);
    expect(output.state).toEqual(input.state);
    expect(output.zipCode).toEqual(input.zipCode);
    expect(output.items[0].id).toBe(input.items[0].id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].id).toBe(input.items[1].id);
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);
  });

  it("should find a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      id: "1",
      name: "Invoice 1",
      document: "123",
      street: "street",
      number: "123",
      complement: "14",
      city: "Sao Paulo",
      state: "SP",
      zipCode: "12345678",
      items: [
        { id: "1", name: "Product 1", price: 100.0 },
        { id: "2", name: "Product 2", price: 200.0 },
      ],
    };

    await InvoiceModel.create(
      {
        id: input.id,
        name: input.name,
        document: input.document,
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,

        items: input.items.map((p) => {
          return {
            id: p.id,
            name: p.name,
            price: p.price,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [ProductModel],
      }
    );

    const output = await facade.find({ id: "1" });

    expect(output).toBeDefined();
    expect(output.id).toBeDefined();
    expect(output.name).toEqual(input.name);
    expect(output.document).toEqual(input.document);
    expect(output.address.street).toEqual(input.street);
    expect(output.address.number).toEqual(input.number);
    expect(output.address.complement).toEqual(input.complement);
    expect(output.address.city).toEqual(input.city);
    expect(output.address.state).toEqual(input.state);
    expect(output.address.zipCode).toEqual(input.zipCode);
    expect(output.items[0].id).toBe(input.items[0].id);
    expect(output.items[0].name).toBe(input.items[0].name);
    expect(output.items[0].price).toBe(input.items[0].price);
    expect(output.items[1].id).toBe(input.items[1].id);
    expect(output.items[1].name).toBe(input.items[1].name);
    expect(output.items[1].price).toBe(input.items[1].price);
  });
});
