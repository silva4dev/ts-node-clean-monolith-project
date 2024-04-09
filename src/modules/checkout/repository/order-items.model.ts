import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
  tableName: "order_item",
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare price: number;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;
}
