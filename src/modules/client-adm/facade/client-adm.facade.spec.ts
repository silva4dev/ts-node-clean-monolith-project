import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/facade.factory";

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "client@client",
      document: "123456789",
      street: "Rua do client",
      number: "123",
      complement: "Complemento do client",
      city: "Cidade do client",
      state: "Estado do client",
      zipCode: "12345678",
    };

    await facade.addClient(input);
    const client = await ClientModel.findOne({ where: { id: "1" } });
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.document).toEqual(input.document);
    expect(client.street).toEqual(input.street);
    expect(client.number).toEqual(input.number);
    expect(client.complement).toEqual(input.complement);
    expect(client.city).toEqual(input.city);
    expect(client.state).toEqual(input.state);
    expect(client.zipCode).toEqual(input.zipCode);
  });

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "client@client",
      document: "123456789",
      street: "Rua do client",
      number: "123",
      complement: "Complemento do client",
      city: "Cidade do client",
      state: "Estado do client",
      zipCode: "12345678",
    };
    await facade.addClient(input);

    const inputFind = {
      id: "1",
    };

    const client = await facade.findClient(inputFind);
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.street).toEqual(input.street);
    expect(client.number).toEqual(input.number);
    expect(client.complement).toEqual(input.complement);
    expect(client.city).toEqual(input.city);
    expect(client.state).toEqual(input.state);
    expect(client.zipCode).toEqual(input.zipCode);
  });
});
