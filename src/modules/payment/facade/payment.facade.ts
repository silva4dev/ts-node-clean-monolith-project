import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUsecase: UseCaseInterface;

  constructor(processPaymentUseCase: UseCaseInterface) {
    this._processPaymentUsecase = processPaymentUseCase;
  }

  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this._processPaymentUsecase.execute(input);
  }
}
