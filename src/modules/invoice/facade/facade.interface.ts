import {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from "./facade.interface.dto";

export default interface InvoiceFacadeInterface {
  generateInvoice(
    input: GenerateInvoiceFacadeInputDto,
  ): Promise<GenerateInvoiceFacadeOutputDto>;
  findInvoice(
    input: FindInvoiceFacadeInputDTO,
  ): Promise<FindInvoiceFacadeOutputDTO>;
}
