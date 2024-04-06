import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import TransactionRepository from "./transaction.repository";

describe("TransactionRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save a transaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "1",
    });
    transaction.approve();

    const repository = new TransactionRepository();
    const output = await repository.save(transaction);

    expect(output.id.id).toBe(transaction.id.id);
    expect(output.status).toBe("approved");
    expect(output.amount).toBe(transaction.amount);
    expect(output.orderId).toBe(transaction.orderId);
  });
});
