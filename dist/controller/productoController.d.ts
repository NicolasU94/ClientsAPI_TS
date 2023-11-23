import { Request, Response, NextFunction } from 'express';
declare const productoController: {
    subirArchivo: (req: Request, res: Response, next: NextFunction) => void;
    newProduct: (req: Request, res: Response) => Promise<void>;
    getProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    searchProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProductById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProductById: (req: Request, res: Response) => Promise<void>;
    deleteProductById: (req: Request, res: Response) => Promise<void>;
};
export default productoController;
//# sourceMappingURL=productoController.d.ts.map