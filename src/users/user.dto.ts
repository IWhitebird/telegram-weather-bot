export class CreateUserDto {
    readonly chatId: string;
    readonly first_name: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly subscription: boolean;
  }
  
  export class UpdateUserDto {
    readonly chatId?: string;
    readonly first_name?: string;
    readonly latitude?: number;
    readonly longitude?: number;
    readonly subscription?: boolean;
  }
