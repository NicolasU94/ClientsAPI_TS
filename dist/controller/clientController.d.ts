import { Request, Response, NextFunction } from "express";
declare const clientController: {
    newClient: (req: Request, res: Response) => Promise<void>;
    getClients: (req: Request, res: Response) => Promise<void>;
    getClientById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateClientById: (req: Request, res: Response) => Promise<void>;
    deleteClientById: (req: Request, res: Response) => Promise<void>;
};
export default clientController;
//# sourceMappingURL=clientController.d.ts.map