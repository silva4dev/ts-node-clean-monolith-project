import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  
    private useCaseProcessPayment: UseCaseInterface;

    constructor(useCaseProcessPayment: UseCaseInterface) {
        this.useCaseProcessPayment = useCaseProcessPayment;
    }
  
    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this.useCaseProcessPayment.execute(input);
    }

}