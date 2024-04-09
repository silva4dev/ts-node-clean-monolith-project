import express, { Request, Response } from "express";
import AddClientUseCase from "../../../usecase/add-client/add-client.usecase";
import ClientRepository from "../../../repository/client.repository";
import FindClientUseCase from "../../../usecase/find-client/find-client.usecase";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new AddClientUseCase(new ClientRepository());
  try {
    const clientDto = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    };

    const output = await useCase.execute(clientDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

clientRoute.get("/:id/", async (req: Request, res: Response) => {
  const useCase = new FindClientUseCase(new ClientRepository());
  try {
    const output = await useCase.execute({ id: req.params.id });
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
