import { Request, Response } from "express";
import UserModel from "../models/TestUserM";

const UserController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async createUser(req: Request, res: Response) {
    const { firstname, lastname, email, password, refreshToken } = req.body;
    try {
      const newUser = await UserModel.create({
        firstname,
        lastname,
        email,
        password,
        refresh_token: refreshToken,
        is_active: false,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const user = await UserModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.update(updateData);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.destroy();
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default UserController;
