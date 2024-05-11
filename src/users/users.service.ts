import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDto } from 'src/dto/user.dto';
import { UsersEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { compareSync } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
    ) {};

    /*
    [POST]: Register
    */
    async createUser(userDto: UsersDto): Promise<UsersDto | null> {
        const iv = randomBytes(16);
        const key = (await promisify(scrypt)(userDto.password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        let encryptedText = cipher.update(userDto.password, 'utf8', 'hex');
        encryptedText += cipher.final('hex');
        userDto.password = encryptedText;
        userDto.iv = iv.toString('hex');
        const checkUser = await this.userRepository.findOne({
            where: {
                username: userDto.username,
            }
        });
        if (checkUser) {
            return null;
        }
        const responseUser: UsersEntity = await this.userRepository.save(userDto);
        const responseData: UsersDto = {
            username: responseUser.username,
            password: responseUser.password
        };
        return responseData;
    }
    
    async checkLogin(username: string, password: string): Promise<UsersEntity | null> {
        const foundUser = await this.userRepository.findOne({
            where: {
                username: username,
            }
        });

        if (foundUser) {
            const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
            const decipher = createCipheriv('aes-256-ctr', key, Buffer.from(foundUser.iv, 'hex'));
            let decryptedText = decipher.update(foundUser.password, 'hex', 'utf8');
            decryptedText += decipher.final('utf8');
            console.log(decryptedText);
            if (decryptedText === password) {
                return foundUser;
            }
        }
        return undefined;
    }
}
