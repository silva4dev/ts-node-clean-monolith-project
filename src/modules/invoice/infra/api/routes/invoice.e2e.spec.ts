import request from "supertest";
import { app, sequelize } from "../../../../@shared/infra/api/express";

describe("E2E test for find invoice", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("should find a invoice", async () => {
    var response = await request(app).post("/products").send({
      name: "Camiseta 1",
      description: "Camiseta de algodao estampada",
      price: 79.9,
      stock: 5,
    });
    expect(response.status).toBe(200);
    const idProduct1 = response.body.id;

    response = await request(app).post("/products").send({
      name: "Camiseta 2",
      description: "Camiseta de algodao florida",
      price: 179.9,
      stock: 5,
    });

    expect(response.status).toBe(200);
    const idProduct2 = response.body.id;

    response = await request(app).post("/clients").send({
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

    const idInvoice = response.body.invoiceId;
    response = await request(app).get(`/invoice/${idInvoice}`).send();

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("João da Silva");
    expect(response.body.document).toBe("12345678900");
    expect(response.body.address.street).toBe("Rua das Flores");
    expect(response.body.address.number).toBe("123");
    expect(response.body.address.complement).toBe("Apto 4B");
    expect(response.body.address.city).toBe("Caçador");
    expect(response.body.address.state).toBe("SC");
    expect(response.body.address.zipCode).toBe("89500000");
    expect(response.body.total).toBe(259.8);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.items[0].id).toBe(idProduct1);
    expect(response.body.items[0].name).toBe("Camiseta 1");
    expect(response.body.items[0].price).toBe(79.9);
    expect(response.body.items[1].id).toBe(idProduct2);
    expect(response.body.items[1].name).toBe("Camiseta 2");
    expect(response.body.items[1].price).toBe(179.9);
  });
});
