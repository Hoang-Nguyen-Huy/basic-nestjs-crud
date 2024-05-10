import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDto } from 'src/dto/user.dto';
import { UsersEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
    ) {};

    /*
    [POST]: Register
    */
    createUser(userDto: UsersDto): Promise<UsersEntity> {
        return this.userRepository.save(userDto);
    }
}
