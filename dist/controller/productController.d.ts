import { Request, Response, NextFunction } from 'express';
declare const productController: {
    uploadFile: (req: Request, res: Response, next: NextFunction) => void;
    newProduct: (req: Request, res: Response) => Promise<void>;
    getProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    searchProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProductById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProductById: (req: Request, res: Response) => Promise<void>;
    deleteProductById: (req: Request, res: Response) => Promise<void>;
};
export default productController;
//# sourceMappingURL=productController.d.ts.map