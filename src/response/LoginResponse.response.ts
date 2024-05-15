import { ApiResponseProperty } from "@nestjs/swagger";

export class LoginResponseSuccess {
    @ApiResponseProperty({
        example: {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ"
        }
    })
    access_token: string;
}

export class LoginResponseFail {
    @ApiResponseProperty({
        example: 500
    })
    statusCode: number;

    @ApiResponseProperty({
        example: 'Internal server error'
    })
    message: string;
}