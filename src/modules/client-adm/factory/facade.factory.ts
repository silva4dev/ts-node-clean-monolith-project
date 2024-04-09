import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
  static create(): ClientAdmFacade {
    const productRepository = new ClientRepository();
    const addClientUsecase = new AddClientUseCase(productRepository);
    const findClientUsecase = new FindClientUseCase(productRepository);

    const facade = new ClientAdmFacade({
      addClientUseCase: addClientUsecase,
      findClientUseCase: findClientUsecase,
    });

    return facade;
  }
}
