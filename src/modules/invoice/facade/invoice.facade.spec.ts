import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facade.factory";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";


describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }

        });

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    const facade = InvoiceFacadeFactory.create();
    const input = {
        name: "John Doe",
        document: "123456789",
        street: "Rua 1",
        number: "123",
        complement: "Casa",
        city: "Cidade",
        state: "Estado",
        zipCode: "12345678",
        items: [
            {
                name: "item 1",
                price: 10,
            },
            {
                name: "item 2",
                price: 20,
            }
        ]
    }


    it("should create a invoice", async () => {
        const output = await facade.generateInvoice(input);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: output.id },
            include: [{ model: InvoiceItemModel }],
        });

        expect(invoiceDb.id).toEqual(output.id);
        expect(invoiceDb.name).toEqual(output.name);
        expect(invoiceDb.document).toEqual(output.document);
        expect(invoiceDb.street).toEqual(output.street);
        expect(invoiceDb.number).toEqual(output.number);
        expect(invoiceDb.complement).toEqual(output.complement);
        expect(invoiceDb.city).toEqual(output.city);
        expect(invoiceDb.state).toEqual(output.state);
        expect(invoiceDb.zipCode).toEqual(output.zipCode);

        const itemsDb = invoiceDb.items;
        expect(itemsDb).toHaveLength(2);

        expect(itemsDb[0].id).toEqual(output.items[0].id);
        expect(itemsDb[0].name).toEqual(output.items[0].name);
        expect(itemsDb[0].price).toEqual(output.items[0].price);

        expect(itemsDb[1].id).toEqual(output.items[1].id);
        expect(itemsDb[1].name).toEqual(output.items[1].name);
        expect(itemsDb[1].price).toEqual(output.items[1].price);
        


    });

    it("should find a invoice", async () => {

        const invoice = await facade.generateInvoice(input);

        const invoiceDb = await facade.findInvoice({ id: invoice.id });

        expect(invoiceDb.id).toEqual(invoice.id);
        expect(invoiceDb.name).toEqual(invoice.name);
        expect(invoiceDb.document).toEqual(invoice.document);
        expect(invoiceDb.address.street).toEqual(invoice.street);
        expect(invoiceDb.address.number).toEqual(invoice.number);
        expect(invoiceDb.address.complement).toEqual(invoice.complement);
        expect(invoiceDb.address.city).toEqual(invoice.city);
        expect(invoiceDb.address.state).toEqual(invoice.state);
        expect(invoiceDb.address.zipCode).toEqual(invoice.zipCode);


        const itemsDb = invoiceDb.items;
        expect(itemsDb).toHaveLength(2);

        expect(itemsDb[0].id).toEqual(invoice.items[0].id);
        expect(itemsDb[0].name).toEqual(invoice.items[0].name);
        expect(itemsDb[0].price).toEqual(invoice.items[0].price);

        expect(itemsDb[1].id).toEqual(invoice.items[1].id);
        expect(itemsDb[1].name).toEqual(invoice.items[1].name);
        expect(itemsDb[1].price).toEqual(invoice.items[1].price);

    });

});