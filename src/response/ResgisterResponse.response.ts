import { ApiResponseProperty } from "@nestjs/swagger";
import { UsersDto } from "src/dto/user.dto";

export class RegisterResponseSuccess {
    @ApiResponseProperty({
        example: {
            username: 'hoang123',
            password: '901c81dc94cb',
            role: 'admin'
        },
    })
    data: UsersDto;
    
    @ApiResponseProperty({
        example: 201,
    })
    statusCode: number;
  
    @ApiResponseProperty({
        example: 'Server Response Success'
    })
    message: string;
}

export class RegisterResponseFail {
    @ApiResponseProperty({
        example: null,
    })
    data: UsersDto;
    
    @ApiResponseProperty({
        example: 403
    })
    statusCode: number;
  
    @ApiResponseProperty({
        example: 'This username was taken!!!',
    })
    message: string;
}