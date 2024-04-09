import request from "supertest";
import { app, sequelize } from "../../../../@shared/infra/api/express";

describe("E2E test for checkout", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("should create a checkout", async () => {
    var response = await request(app).post("/product").send({
      name: "Camiseta 1",
      description: "Camiseta de algodao estampada",
      price: 79.9,
      stock: 5,
    });
    expect(response.status).toBe(200);
    const idProduct1 = response.body.id;

    response = await request(app).post("/product").send({
      name: "Camiseta 2",
      description: "Camiseta de algodao florida",
      price: 179.9,
      stock: 5,
    });

    expect(response.status).toBe(200);
    const idProduct2 = response.body.id;

    response = await request(app).post("/client").send({
      name: "João da Silva",
      email: "joao@example.com",
      document: "12345678900",
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 4B",
      city: "Caçador",
      state: "SC",
      zipCode: "89500000",
    });

    expect(response.status).toBe(200);
    const idClient = response.body.id;

    response = await request(app)
      .post("/checkout")
      .send({
        clientId: idClient,
        products: [{ productId: idProduct1 }, { productId: idProduct2 }],
      });

    expect(response.status).toBe(200);
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.status).toBe("approved");
    expect(response.body.total).toBe(259.8);
    expect(response.body.products).toHaveLength(2);
    expect(response.body.products[0].productId).toBe(idProduct1);
    expect(response.body.products[1].productId).toBe(idProduct2);
  });
});
