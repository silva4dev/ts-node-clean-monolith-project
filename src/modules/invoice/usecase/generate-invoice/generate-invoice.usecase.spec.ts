import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const address = new Address(
  "street",
  "123",
  "14",
  "Sao Paulo",
  "SP",
  "12345678"
);
const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  price: 100.0,
});
const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  price: 200.0,
});

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "123",
  address: address,
  items: [product, product2],
});

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate invoice Usecase unit test", () => {
  it("should generate a invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
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

    const ouput = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
    expect(ouput.id).toBeDefined();
    expect(ouput.name).toEqual(invoice.name);
    expect(ouput.document).toEqual(invoice.document);
    expect(ouput.street).toEqual(invoice.address.street);
    expect(ouput.number).toEqual(invoice.address.number);
    expect(ouput.complement).toEqual(invoice.address.complement);
    expect(ouput.city).toEqual(invoice.address.city);
    expect(ouput.state).toEqual(invoice.address.state);
    expect(ouput.zipCode).toEqual(invoice.address.zipCode);
    expect(ouput.items[0].id).toEqual(invoice.items[0].id.id);
    expect(ouput.items[0].name).toEqual(invoice.items[0].name);
    expect(ouput.items[0].price).toEqual(invoice.items[0].price);
    expect(ouput.items[1].id).toEqual(invoice.items[1].id.id);
    expect(ouput.items[1].name).toEqual(invoice.items[1].name);
    expect(ouput.items[1].price).toEqual(invoice.items[1].price);
    expect(ouput.total).toEqual(300.0);
  });
});
