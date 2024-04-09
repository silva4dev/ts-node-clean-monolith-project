import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create(): PaymentFacade {
        const productRepository = new TransactionRepository();
        const processPaymentUsecase = new ProcessPaymentUsecase(productRepository);
        const productFacade = new PaymentFacade(processPaymentUsecase);
        return productFacade;
    }
}