import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction.entity";
import ProcessPaymentUsecase from "./process-payment.usecase";

const transactionExpected = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionExpected)),
  };
};

describe("ProcessPaymentUsecase unit test", () => {
  it("should return a transaction", async () => {
    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUsecase(paymentRepository);
    const input = {
      amount: 100,
      orderId: "1",
    };

    const result = await usecase.execute(input);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe(transactionExpected.id.id);
    expect(result.amount).toBe(transactionExpected.amount);
    expect(result.orderId).toBe(transactionExpected.orderId);
    expect(result.status).toBe(transactionExpected.status);
  });
});
