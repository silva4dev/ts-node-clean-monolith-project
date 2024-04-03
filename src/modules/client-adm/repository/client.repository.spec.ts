import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
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

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    const output = await repository.find(client.id);

    expect(output.id.id).toEqual(client.id);
    expect(output.name).toEqual(client.name);
    expect(output.email).toEqual(client.email);
    expect(output.address).toEqual(client.address);
    expect(output.createdAt).toEqual(client.createdAt);
    expect(output.updatedAt).toEqual(client.updatedAt);
  });
});
