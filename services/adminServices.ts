import AdminRepository from '../repositories/adminRepository';
import Admin from '../Dto/adminDto';
import generateHash from '../Helpers/generateHash';
import Auth from '../Dto/AuthDto';


class UserService {
    
    static async register(user: Admin) {
        user.password = await generateHash(user.password);
        return await AdminRepository.add(user);
    }

    static async login(auth: Auth) {
        return await AdminRepository.login(auth);
    }
}

export default UserService;