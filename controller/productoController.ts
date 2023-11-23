import { Request,Response, NextFunction } from 'express';
import Productos from '../models/Productos';
// const Productos = require("../models/Productos");
import multer, {diskStorage} from 'multer';
// const multer = require("multer");
import shortid from 'shortid';
// const shortid = require("shortid");

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


const productoController = {

//Uploading a file
  subirArchivo: (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, function (err) {
    if (err) {
      res.status(500).json({ mensaje: err });
    } else {
      return next();
    }
  });
},

newProduct: async (req: Request, res: Response) => {
  const product = new Productos(req.body);

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
    const products = await Productos.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
},

searchProducts: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.params?.query as string;
    const product = await Productos.find({ nombre: new RegExp(query, "i") });
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
},

getProductById: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Productos.findById(req.params.id);
    console.log(product);
    if (!product) {
      res.status(404).json({ mensaje: "Product Not Found" });
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
    let prevProduct = await Productos.findById(req.params.id);

    // Building a new Product Object
    let newProduct = req.body;
    if (req.file) {
      newProduct.imagen = req.file.filename;
    } else {
      newProduct.imagen = prevProduct?.imagen;
    }

    //Updating the Product Object
    const product = await Productos.findOneAndUpdate(
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
    await Productos.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
},

}


export default productoController;



