import { Response, Request } from 'express';
import AdminRepository from '../repositories/adminRepository';

const deleteOrganizador = async (req: Request, res: Response)=>{

    try {
        const { email, password } = req.body;

        const result = await AdminRepository.delete(email,password);

        return res.status(200).json(result.message);
    } catch (error) {
        console.log(error);
        
    }
}

export default deleteOrganizador;