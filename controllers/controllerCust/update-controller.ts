import { Request, Response } from 'express';
import CustRepository from "../../repositories/custRepository";

class CusrController {
    static updateUsers = async (req: Request, res: Response) => {
        const { nameUser, marca, placa } = req.body;


        try {
            const result = await CustRepository.update(nameUser, marca,placa);
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
    };
}
  
  export default CusrController;