import { Request, Response } from 'express';
import UserService from '../repositories/adminRepository';

class UserController {
  static updateUsers = async (req: Request, res: Response) => {
    const { name, password, email } = req.body;

    try {
      const result = await UserService.update( name, password, email);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  };
}

export default UserController;