import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

describe("Find invoice usecase unit test", () => {
  const invoiceItem1 = new InvoiceItem({
    id: new Id("1"),
    name: "item 1",
    price: 10,
  });

  const invoiceItem2 = new InvoiceItem({
    id: new Id("2"),
    name: "item 2",
    price: 20,
  });

  const invoiceExpected = new Invoice({
    id: new Id("1"),
    name: "John Doe",
    document: "123456789",
    address: new Address({
      street: "Rua 1",
      number: "123",
      complement: "Casa",
      city: "Cidade",
      state: "Estado",
      zipCode: "12345678",
    }),
    items: [invoiceItem1, invoiceItem2],
  });

  const MockRepository = () => {
    return {
      save: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(invoiceExpected)),
    };
  };

  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);
    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoiceExpected.name);
    expect(result.document).toBe(invoiceExpected.document);

    expect(result.address.street).toBe(invoiceExpected.address.street);
    expect(result.address.number).toBe(invoiceExpected.address.number);
    expect(result.address.complement).toBe(invoiceExpected.address.complement);
    expect(result.address.city).toBe(invoiceExpected.address.city);
    expect(result.address.state).toBe(invoiceExpected.address.state);
    expect(result.address.zipCode).toBe(invoiceExpected.address.zipCode);

    expect(result.items.length).toBe(invoiceExpected.items.length);
    expect(result.items[0].id).toBe(invoiceExpected.items[0].id.id);
    expect(result.items[0].name).toBe(invoiceExpected.items[0].name);
    expect(result.items[0].price).toBe(invoiceExpected.items[0].price);

    expect(result.items[1].id).toBe(invoiceExpected.items[1].id.id);
    expect(result.items[1].name).toBe(invoiceExpected.items[1].name);
    expect(result.items[1].price).toBe(invoiceExpected.items[1].price);

    expect(result.total).toBe(invoiceExpected.total);
  });
});
