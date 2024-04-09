import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("shouuld create a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "John Doe",
      email: "john@john.com.br",
      document: "123456789",
      street: "Rua 1",
      number: "123",
      complement: "Complemento",
      city: "Cidade",
      state: "Estado",
      zipCode: "1234-123",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: "1" } });
    expect(clientDb.id).toEqual(client.id.id);
    expect(clientDb.name).toEqual(client.name);
    expect(clientDb.email).toEqual(client.email);
    expect(clientDb.document).toEqual(client.document);
    expect(clientDb.street).toEqual(client.street);
    expect(clientDb.number).toEqual(client.number);
    expect(clientDb.complement).toEqual(client.complement);
    expect(clientDb.city).toEqual(client.city);
    expect(clientDb.state).toEqual(client.state);
    expect(clientDb.zipCode).toEqual(client.zipCode);
    expect(clientDb.createdAt).toEqual(client.createdAt);
    expect(clientDb.updatedAt).toEqual(client.updatedAt);
  });

  it("shouuld find a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "John Doe",
      email: "john@john.com.br",
      document: "123456789",
      street: "Rua 1",
      number: "123",
      complement: "Complemento",
      city: "Cidade",
      state: "Estado",
      zipCode: "1234-123",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientFound = await repository.find("1");
    expect(clientFound.id).toEqual(client.id);
    expect(clientFound.name).toEqual(client.name);
    expect(clientFound.email).toEqual(client.email);
    expect(clientFound.document).toEqual(client.document);
    expect(clientFound.street).toEqual(client.street);
    expect(clientFound.number).toEqual(client.number);
    expect(clientFound.complement).toEqual(client.complement);
    expect(clientFound.city).toEqual(client.city);
    expect(clientFound.state).toEqual(client.state);
    expect(clientFound.zipCode).toEqual(client.zipCode);
    expect(clientFound.createdAt).toBeDefined();
    expect(clientFound.updatedAt).toBeDefined();
  });
});
