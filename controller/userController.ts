import { Request, Response, NextFunction } from 'express';
import Users from '../models/Users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userController = {
registerUser : async (req : Request, res: Response, next: NextFunction) => {
  const user = new Users(req.body);

  user.password = await bcrypt.hash(req.body.password, 10);

  try {
    await user.save();
    res.json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "There was an error" });
  }
  },
  authenticateUser: async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "User does not exist" });
    next();
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ message: "Incorrect Password" });
      next();
    } else {
      const token = jwt.sign(
        {
          email: user.email,
          user: user.name,
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

export default userController;




