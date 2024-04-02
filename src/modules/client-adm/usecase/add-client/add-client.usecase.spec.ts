import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Client Usecase unit tests", () => {
  it("should add a client", async () => {
    const clientRepository = MockRepository();
    const usecase = new AddClientUseCase(clientRepository);

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    };

    const output = await usecase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();
    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.address).toBe(input.address);
  });
});
