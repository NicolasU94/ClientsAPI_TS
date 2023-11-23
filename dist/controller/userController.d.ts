import { Request, Response, NextFunction } from 'express';
declare const userController: {
    registerUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    authenticateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
export default userController;
//# sourceMappingURL=userController.d.ts.map