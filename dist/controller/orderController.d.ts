import { Response, Request, NextFunction } from 'express';
declare const orderController: {
    newOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getOrderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateOrderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteOrderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
export default orderController;
//# sourceMappingURL=orderController.d.ts.map