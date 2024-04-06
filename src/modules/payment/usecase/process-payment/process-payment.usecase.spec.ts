import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
};

const transaction2 = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined",
});

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
  };
};

describe("Process payment usecase unit test", () => {
  it("should approve a transaction", async () => {
    const transactionRepository = MockRepository();
    const usecase = new ProcessPaymentUseCase(transactionRepository);
    const input = {
      orderId: "1",
      amount: 100,
    };
    const output = await usecase.execute(input);
    expect(output.transactionId).toBe(transaction.id.id);
    expect(transactionRepository.save).toHaveBeenCalled();
    expect(output.status).toBe("approved");
    expect(output.amount).toBe(100);
    expect(output.orderId).toBe("1");
    expect(output.createdAt).toBe(transaction.createdAt);
    expect(output.updatedAt).toBe(transaction.updatedAt);
  });

  it("should decline a transaction", async () => {
    const transactionRepository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUseCase(transactionRepository);
    const input = {
      orderId: "1",
      amount: 50,
    };
    const output = await usecase.execute(input);
    expect(output.transactionId).toBe(transaction2.id.id);
    expect(transactionRepository.save).toHaveBeenCalled();
    expect(output.status).toBe("declined");
    expect(output.amount).toBe(50);
    expect(output.orderId).toBe("1");
    expect(output.createdAt).toBe(transaction2.createdAt);
    expect(output.updatedAt).toBe(transaction2.updatedAt);
  });
});
