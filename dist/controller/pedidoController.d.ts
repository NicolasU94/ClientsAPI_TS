import { Response, Request, NextFunction } from 'express';
declare const pedidoController: {
    newPedido: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPedidos: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPedidoById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatePedidoById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletePedidoById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
export default pedidoController;
//# sourceMappingURL=pedidoController.d.ts.map