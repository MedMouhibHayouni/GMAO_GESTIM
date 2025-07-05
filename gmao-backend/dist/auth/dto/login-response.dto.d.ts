export declare class LoginResponseDto {
    access_token: string;
    user: {
        id: string;
        username: string;
        email: string;
        firstName?: string;
        lastName?: string;
        department?: string;
        roles: Array<{
            id: string;
            name: string;
        }>;
    };
}
