import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
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
