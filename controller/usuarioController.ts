import { Request, Response, NextFunction } from 'express';
import Usuarios from '../models/Usuarios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// const Usuarios = require("../models/Usuarios.js");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const usuarioController = {
registerUser : async (req : Request, res: Response, next: NextFunction) => {
  const user = new Usuarios(req.body);

  user.password = await bcrypt.hash(req.body.password, 10);

  try {
    await user.save();
    res.json({ mensaje: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "There was an error" });
  }
  },
  authenticateUser: async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await Usuarios.findOne({ email });

  if (!user) {
    res.status(401).json({ mensaje: "User does not exist" });
    next();
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ mensaje: "Incorrect Password" });
      next();
    } else {
      const token = jwt.sign(
        {
          email: user.email,
          usuario: user.nombre,
          id: user._id,
        },
        process.env.SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.json({ token });
    }
  }
}
}

export default usuarioController;




