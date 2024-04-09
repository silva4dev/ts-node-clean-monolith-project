import { app, sequelize } from "../../../../@shared/infra/api/express";
import request from "supertest";

describe("Client e2e test", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("should create a client", async () => {
    const response = await request(app).post("/client").send({
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
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("João da Silva");
    expect(response.body.email).toBe("joao@example.com");
    expect(response.body.document).toBe("12345678900");
    expect(response.body.street).toBe("Rua das Flores");
    expect(response.body.number).toBe("123");
    expect(response.body.complement).toBe("Apto 4B");
    expect(response.body.city).toBe("Caçador");
    expect(response.body.state).toBe("SC");
    expect(response.body.zipCode).toBe("89500000");
  });

  it("should get a client", async () => {
    const response = await request(app).post("/client").send({
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

    const idClient = response.body.id;
    const responseGetClient = await request(app)
      .get(`/client/${idClient}`)
      .send();

    expect(responseGetClient.status).toBe(200);
    expect(responseGetClient.body.id).toBe(idClient);
    expect(responseGetClient.body.name).toBe("João da Silva");
    expect(responseGetClient.body.email).toBe("joao@example.com");
    expect(responseGetClient.body.document).toBe("12345678900");
    expect(responseGetClient.body.street).toBe("Rua das Flores");
    expect(responseGetClient.body.number).toBe("123");
    expect(responseGetClient.body.complement).toBe("Apto 4B");
    expect(responseGetClient.body.city).toBe("Caçador");
    expect(responseGetClient.body.state).toBe("SC");
    expect(responseGetClient.body.zipCode).toBe("89500000");
  });
});
