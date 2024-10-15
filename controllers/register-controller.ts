import { Request, Response } from "express";
import Admin from '../Dto/adminDto';
import UserService from '../services/adminServices';
import AdminRepository from "../repositories/adminRepository";



let register = async (req: Request, res: Response) => {  
  try {
    const {  name, email, password } = req.body;
    
    if (await AdminRepository.emailExiste(email)) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
  }

    const registerUser = await UserService.register(new Admin(name, email, password))
    
    return res.status(201).json(
      { status: 'register ok'}
    );
  } catch (error: any) {    
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).json({ errorInfo: error.sqlMessage }
      );
    }
  }
}


export default register;