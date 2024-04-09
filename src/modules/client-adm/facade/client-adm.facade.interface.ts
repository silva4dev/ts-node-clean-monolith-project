import {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.dto";

export default interface ClientAdmFacadeInterface {
  addClient(input: AddClientFacadeInputDto): Promise<void>;
  findClient(
    input: FindClientFacadeInputDto,
  ): Promise<FindClientFacadeOutputDto>;
}
