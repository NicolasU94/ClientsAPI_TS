import { Request,Response, NextFunction } from 'express';
import Products from '../models/Products';
import multer, {diskStorage} from 'multer';
import shortid from 'shortid';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "../../uploads/");
  },
  filename: (req, file, cb) => {
    const extension : string | undefined = file.mimetype.split("/")[1];
    cb(null, `${shortid.generate()}.${extension}`);
  },
});

const configuracionMulter = {
  storage,
  fileFilter(req: Request, file: Express.Multer.File, cb: Function) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido"));
    }
  },
};

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single("imagen");


const productController = {

//Uploading a file
  uploadFile: (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, function (err) {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      return next();
    }
  });
},

newProduct: async (req: Request, res: Response) => {
  const product = new Products(req.body);

  try {
    if (req.file?.filename) {
      product.imagen = req.file.filename;
    }
    await product.save();
    res.status(201).json({ message: "New Product Created Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
},

getProducts: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
},

searchProducts: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.params?.query as string;
    const product = await Products.find({ name: new RegExp(query, "i") });
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
},

getProductById: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Products.findById(req.params.id);
    console.log(product);
    if (!product) {
      res.status(404).json({ message: "Product Not Found" });
      return next();
    }
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
},

updateProductById: async (req: Request, res: Response) => {
  try {
    //Attempting to find a product by its ID
    let prevProduct = await Products.findById(req.params.id);

    // Building a new Product Object
    let newProduct = req.body;
    if (req.file) {
      newProduct.imagen = req.file.filename;
    } else {
      newProduct.imagen = prevProduct?.imagen;
    }

    //Updating the Product Object
    const product = await Products.findOneAndUpdate(
      { _id: req.params.id },
      newProduct,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
},

deleteProductById: async (req: Request, res: Response) => {
  try {
    const result: null | string = await Products.findOneAndDelete({ _id: req.params.id });
    if (!result) {
      res.status(404).json({ message: "Product Not found" });
    } else {
      res.json({ message: "Product Deleted Successfully" });  
    }
  } catch (error) {
    res.status(500).send(error);
  }
},

}


export default productController;



