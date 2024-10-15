import { Response, Request } from 'express';
import CustRepository from '../../repositories/custRepository';


const deleteOrganizador = async (req: Request, res: Response)=>{

    try {
        const { nameUser, placa } = req.body;

        const result = await CustRepository.delete(nameUser,placa);

        return res.status(200).json(result.message);
    } catch (error) {
        console.log(error);
        
    }
}

export default deleteOrganizador;