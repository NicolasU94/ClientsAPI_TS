import { Request, Response, NextFunction } from "express";
declare const clienteController: {
    newClient: (req: Request, res: Response) => Promise<void>;
    getClients: (req: Request, res: Response) => Promise<void>;
    getClientById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateClientById: (req: Request, res: Response) => Promise<void>;
    deleteClientById: (req: Request, res: Response) => Promise<void>;
};
export default clienteController;
//# sourceMappingURL=clienteController.d.ts.map