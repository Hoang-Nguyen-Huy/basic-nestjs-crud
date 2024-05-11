import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDto } from 'src/dto/user.dto';
import { UsersEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
    ) {};

    /*
    [POST]: Register
    */
    async createUser(userDto: UsersDto): Promise<UsersEntity> {
        const saltOrRounds = 10;
        const password = 'random_password';
        const hash = await bcrypt.hash(password, saltOrRounds);
        userDto.password = hash;
        return this.userRepository.save(userDto);
    }
}
