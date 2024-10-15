import { Response, Request } from'express';
import CustRepository from '../../repositories/custRepository';

const getcontroller = async (req: Request, res: Response) => {
    try {
        const { placa } = req.params; 

        if (await CustRepository.usersExiste(placa)) {
            const organizador = await CustRepository.get(placa);
            return res.status(200).json(organizador);   
        }

        return res.status(404).json({ message: 'Placa no encontrada' }); 
    } catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}


export default getcontroller;