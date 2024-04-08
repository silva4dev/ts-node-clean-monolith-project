import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

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
  name: "Product",
  price: 20.0,
});
const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  price: 40.0,
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
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find invoice Usecase unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1",
    };

    const output = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(output.id).toBeDefined();
    expect(output.name).toEqual(invoice.name);
    expect(output.document).toEqual(invoice.document);
    expect(output.address.street).toEqual(invoice.address.street);
    expect(output.address.number).toEqual(invoice.address.number);
    expect(output.address.complement).toEqual(invoice.address.complement);
    expect(output.address.city).toEqual(invoice.address.city);
    expect(output.address.state).toEqual(invoice.address.state);
    expect(output.address.zipCode).toEqual(invoice.address.zipCode);
    expect(output.items[0].id).toEqual(invoice.items[0].id.id);
    expect(output.items[0].name).toEqual(invoice.items[0].name);
    expect(output.items[0].price).toEqual(invoice.items[0].price);
    expect(output.items[1].id).toEqual(invoice.items[1].id.id);
    expect(output.items[1].name).toEqual(invoice.items[1].name);
    expect(output.items[1].price).toEqual(invoice.items[1].price);
    expect(output.total).toEqual(60.0);
    expect(output.createdAt).toEqual(invoice.createdAt);
  });
});
