import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService {
    private userRepository: Repository<User>;
    
    constructor() {
        this.userRepository = getCustomRepository(UsersRepository);
    }
    
    async create(email: string) {
        // Verificar se usuario existe
        
        const userExists = await this.userRepository.findOne({
            email
        });
        
        // Se não existir, salvar no DB
        if (userExists) {
            return userExists;
        }
        
        const user = this.userRepository.create({
            email
        });
        
        await this.userRepository.save(user);
        
        // Se existir, retornar user
        return user;
    }

    async findByEmail(email: any) {
        return this.userRepository.findOne({ email });
    }
}

export { UsersService };