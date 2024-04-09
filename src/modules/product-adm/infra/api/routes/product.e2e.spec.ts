import { app, sequelize } from "../../../../@shared/infra/api/express";
import request from "supertest";

describe("Product e2e test", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Camiseta",
      description: "Camiseta de algodao estampada",
      price: 79.9,
      stock: 5,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Camiseta");
    expect(response.body.description).toBe("Camiseta de algodao estampada");
    expect(response.body.price).toBe(79.9);
    expect(response.body.stock).toBe(5);
  });

  it("should check stock a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Camiseta",
      description: "Camiseta de algodao estampada",
      price: 79.9,
      stock: 12,
    });

    const idProduct = response.body.id;
    const responseCheckStock = await request(app)
      .get(`/product/${idProduct}/checkstock`)
      .send();

    expect(responseCheckStock.status).toBe(200);
    expect(responseCheckStock.body.productId).toBe(idProduct);
    expect(responseCheckStock.body.productName).toBe("Camiseta");
    expect(responseCheckStock.body.stock).toBe(12);
  });
});
