import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "John Doe",
  email: "john@john.com",
  document: "123456",
  street: "Rua 1",
  number: "123",
  complement: "Complemento",
  city: "Cidade",
  state: "Estado",
  zipCode: "123456",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};

describe("Find client usecase unit test", () => {
  it("should find a client", async () => {
    const repository = MockRepository();
    const usecase = new FindClientUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);
    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
  });
});
