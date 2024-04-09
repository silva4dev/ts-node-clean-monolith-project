import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from "../../../client-adm/infra/api/routes/client.route";
import { productRoute } from "../../../product-adm/infra/api/routes/product.route";
import { ClientModel } from "../../../client-adm/repository/client.model";
import { checkoutRoute } from "../../../checkout/infra/api/routes/checkout.route";
import OrderModel from "../../../checkout/repository/order.model";
import OrderItemModel from "../../../checkout/repository/order-items.model";
import ProductModelStoreCatalog from "../../../store-catalog/repository/product.model";
import ProductModel from "../../../product-adm/repository/product.model";
import TransactionModel from "../../../payment/repository/transaction.model";
import InvoiceModel from "../../../invoice/repository/invoice.model";
import InvoiceItemModel from "../../../invoice/repository/invoice-item.model";
import { invoiceRoute } from "../../../invoice/infra/api/routes/invoice.route";

export const app: Express = express();
app.use(express.json());
app.use("/product", productRoute);
app.use("/client", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);
export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([
    ProductModel,
    ProductModelStoreCatalog,
    TransactionModel,
    InvoiceModel,
    InvoiceItemModel,
    ClientModel,
    OrderModel,
    OrderItemModel,
  ]);
  await sequelize.sync();
}

setupDb();
