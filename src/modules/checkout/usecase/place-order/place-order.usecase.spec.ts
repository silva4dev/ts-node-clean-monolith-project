import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUsecase from "./place-order.usecase";

const mockDate = new Date(2000, 1, 1);

describe("PlaceOrderUsecase unit test", () => {
  describe("Validate products method", () => {
    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase();

    it("should throw an error when products are not valid", async () => {
      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input),
      ).rejects.toThrow(new Error("No products selected"));
    });

    it("should throw an error when product is out of stock", async () => {
      const mockCatalogFacade = {
        checkStock: jest.fn(({ productId }: { productId: string }) =>
          Promise.resolve({
            productId,
            stock: productId === "1" ? 0 : 1,
          }),
        ),
      };

      //@ts-expect-error - force set productFacade
      placeOrderUsecase["_productFacade"] = mockCatalogFacade;

      let input: PlaceOrderInputDto = {
        clientId: "1",
        products: [{ productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input),
      ).rejects.toThrow(new Error("Product 1 is not avaible in stock"));

      input = {
        clientId: "1",
        products: [{ productId: "0" }, { productId: "1" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input),
      ).rejects.toThrow(new Error("Product 1 is not avaible in stock"));

      expect(mockCatalogFacade.checkStock).toHaveBeenCalledTimes(3);

      input = {
        clientId: "1",
        products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }],
      };

      await expect(
        placeOrderUsecase["validateProducts"](input),
      ).rejects.toThrow(new Error("Product 1 is not avaible in stock"));

      expect(mockCatalogFacade.checkStock).toHaveBeenCalledTimes(5);
    });
  });

  describe("getProducts method", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    //@ts-expect-error - no params in constructor
    const placeOrderUsecase = new PlaceOrderUsecase();

    it("should throw and error when product not found", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - force set productFacade
      placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;
      await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrow(
        new Error("Product not found"),
      );
    });

    it("should return a product", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          id: "1",
          name: "Product 1",
          description: "Product 1 description",
          price: 10,
        }),
      };

      //@ts-expect-error - force set productFacade
      placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;
      await expect(placeOrderUsecase["getProduct"]("1")).resolves.toEqual(
        new Product({
          id: new Id("1"),
          name: "Product 1",
          description: "Product 1 description",
          price: 10,
        }),
      );

      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("Execute method", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("should throw an error when client not found", async () => {
      const mockClientFacade = {
        findClient: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();
      //@ts-expect-error - force set clientFacade
      placeOrderUsecase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: [],
      };

      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
        new Error("Client not found"),
      );
    });

    it("should throw an error when produts are not valid", async () => {
      const mockClientFacade = {
        findClient: jest.fn().mockResolvedValue(true),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUsecase = new PlaceOrderUsecase();

      const mockValidateProducts = jest
        //@ts-expect-error - spy private method
        .spyOn(placeOrderUsecase, "validateProducts")
        //@ts-expect-error - nmot return never
        .mockRejectedValue(new Error("No products selected"));

      //@ts-expect-error - force set clientFacade
      placeOrderUsecase["_clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: "1",
        products: [],
      };

      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
        new Error("No products selected"),
      );

      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    });

    describe("place an order", () => {
      const clientProps = {
        id: "1",
        name: "Client 1",
        document: "123456789",
        email: "client@user.com.br",
        street: "Street 1",
        number: "123",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipCode: "89500000",
      };

      const mockClientFacade = {
        findClient: jest.fn().mockResolvedValue(clientProps),
        addClient: jest.fn(),
      };

      const mockPaymantFacade = {
        process: jest.fn(),
      };

      const mockCheckoutRepository = {
        addOrder: jest.fn(),
        findOrder: jest.fn(),
      };

      const mockInvoiceFacade = {
        generateInvoice: jest.fn().mockResolvedValue({ id: "1i" }),
        findInvoice: jest.fn(),
      };

      const placeOrderUsecase = new PlaceOrderUsecase(
        mockClientFacade,
        null,
        null,
        mockCheckoutRepository,
        mockInvoiceFacade as any,
        mockPaymantFacade as any,
      );

      const products = {
        "1": new Product({
          id: new Id("1"),
          name: "Product 1",
          description: "Product 1 description",
          price: 10,
        }),
        "2": new Product({
          id: new Id("2"),
          name: "Product 2",
          description: "Product 2 description",
          price: 20,
        }),
      };

      const mockValidateProducts = jest
        //@ts-expect-error - spy private method
        .spyOn(placeOrderUsecase, "validateProducts")
        //@ts-expect-error - spy private method
        .mockResolvedValue(null);

      const mockGetProduct = jest
        //@ts-expect-error - spy private method
        .spyOn(placeOrderUsecase, "getProduct")
        //@ts-expect-error - spy private method
        .mockImplementation((productId: keyof typeof products) => {
          return products[productId];
        });

      it("should not be approved", async () => {
        mockPaymantFacade.process = mockPaymantFacade.process.mockReturnValue({
          transactionId: "1",
          orderId: "1",
          amount: 100,
          status: "error",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const input: PlaceOrderInputDto = {
          clientId: "1",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        let output = await placeOrderUsecase.execute(input);

        expect(output.invoiceId).toBeNull();
        expect(output.total).toBe(30);
        expect(output.products).toStrictEqual([
          { productId: "1" },
          { productId: "2" },
        ]);

        expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.findClient).toHaveBeenCalledWith({ id: "1" });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockValidateProducts).toHaveBeenCalledWith(input);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymantFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymantFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });

        expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(0);
      });

      it("should be approved", async () => {
        mockPaymantFacade.process = mockPaymantFacade.process.mockReturnValue({
          transactionId: "1",
          orderId: "1",
          amount: 100,
          status: "approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const input: PlaceOrderInputDto = {
          clientId: "1",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        let output = await placeOrderUsecase.execute(input);

        expect(output.invoiceId).toBe("1i");
        expect(output.total).toBe(30);
        expect(output.products).toStrictEqual([
          { productId: "1" },
          { productId: "2" },
        ]);

        expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.findClient).toHaveBeenCalledWith({ id: "1" });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymantFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymantFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });
        expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledWith({
          name: clientProps.name,
          document: clientProps.document,
          street: clientProps.street,
          number: clientProps.number,
          complement: clientProps.complement,
          city: clientProps.city,
          state: clientProps.state,
          zipCode: clientProps.zipCode,
          items: [
            {
              id: products["1"].id.id,
              name: products["1"].name,
              price: products["1"].price,
            },
            {
              id: products["2"].id.id,
              name: products["2"].name,
              price: products["2"].price,
            },
          ],
        });
      });
    });
  });
});
