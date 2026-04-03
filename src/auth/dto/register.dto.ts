import { Role } from '../../users/user.entity';

export class RegisterDto {
  name!: string;
  email!: string;
  password!: string;
  role!: Role;
}
