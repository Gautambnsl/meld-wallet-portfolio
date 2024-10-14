import { Request, Response } from 'express';
import UserModel from '../model/user.model';
import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const userExists = await UserModel.find({ email: body.email }).select('-__v -_id');
    if (userExists.length && userExists) {
      res.status(409).json({
        status: 409,
        message: 'User already registered. Please Login',
        data: {},
      });
    } else {
      const encryptedPassword = await bcrypt.hash(
        body.password,
        config.SALT_ROUND
      );

      body.password = encryptedPassword;

      const user = await UserModel.create(body);

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Please enter valid credentials', data: {} });
      } else {
        return res.status(200).json({
          status: 200,
          message: 'Account created Successfully',
          data: user,
        });
      }
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong, Please try again',
    });
  }
};

const login = async (req: any, res: Response) => {
  try {
    const userSignIn = req.body;
    const signupUsers = await UserModel.findOne({ email: req.body.email }).select('-__v -_id');
    if (!signupUsers) {
      return res.status(400).json({
        status: 400,
        message: 'Please Sign In with registered email',
      });
    } else {
      const isMatched = await bcrypt.compare(
        userSignIn.password,
        signupUsers.password
      );
      if (!isMatched) {
        return res.status(401).json({
          status: 400,
          message: 'Invalid credentials',
        });
      }

      const token = jwt.sign(
        {
          name: signupUsers.name,
          email: signupUsers.email,
        },
        `${config.SECRET_KEY}`,
        {
          expiresIn: config.JWT_EXPIRE,
        }
      );
      signupUsers.token = token;
      res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 86400 });
      await UserModel.updateOne(
        { _id: signupUsers._id },
        { $set: { isLoggedIn: true } }
      );
      return res.status(200).json({
        status: 200,
        message: 'Login Successfully',
        data: {
          name: signupUsers.name,
          email: signupUsers.email,
          token: token,
        },
      });
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong, Please try again',
    });
  }
};

export { register, login };
