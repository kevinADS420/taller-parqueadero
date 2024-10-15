import { Response, Request } from'express';
import AdminRepository from "../repositories/adminRepository";


const getcontroller = async (req: Request, res: Response)=>{

    try {
        const { email } = req.body;
        if(await AdminRepository.emailExiste(email)){
            const organizador = await AdminRepository.get(email);
            return res.status(200).json(organizador);   
        }
        return res.status(400).json({ message: 'Correo electrónico no encontrado' });
    } catch (error) {  console.log(error);
        
    }
}

export default getcontroller;