import { Request, Response, NextFunction } from 'express';
declare const usuarioController: {
    registerUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    authenticateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
export default usuarioController;
//# sourceMappingURL=usuarioController.d.ts.map