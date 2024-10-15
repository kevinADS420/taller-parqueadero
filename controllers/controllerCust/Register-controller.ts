import { Request, Response } from "express";
import Cust from "../../Dto/customers/custDto";
import CustRepository from "../../repositories/custRepository";
import CustService from "../../services/custServices";

let register = async (req: Request, res: Response) => {  
    try {
      const { nameUser, marca, placa } = req.body;
      
      if (await CustRepository.usersExiste(placa)) {
        return res.status(400).json({ message: 'El numero de placa ya está registrado' });
    }
  
      const registerUser = await CustService.register(new Cust(nameUser, marca, placa))
      
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